<template>
  <v-sheet>
    <v-row>
      <v-col cols="12" md="8">
        <!-- Toolbar customization slot with scoped props -->
        <slot name="toolbar"
              :stages="stages"
              :viewMode="viewMode"
              :addStage="addStage"
              :expandAllStages="expandAllStages"
              :collapseAllStages="collapseAllStages"
              :exportPipeline="exportPipeline"
              :viewModeOptions="viewModeOptions">
          <!-- Default toolbar implementation -->
          <v-toolbar>
            <slot name="toolbar-prepend" />

            <v-btn @click="addStage" class="mx-3">
              Add Stage
            </v-btn>

            <v-btn-toggle v-model="viewMode" label="View Mode">
              <v-btn v-for="mode in viewModeOptions" :key="mode.value" :value="mode.value">
                {{ mode.title }}
              </v-btn>
            </v-btn-toggle>

            <v-spacer />

            <template v-if="viewMode === 'stages'">
              <v-btn @click="expandAllStages" icon="mdi-chevron-down" />
              <v-btn @click="collapseAllStages" icon="mdi-chevron-up" />
            </template>

            <slot name="toolbar-append" />
          </v-toolbar>
        </slot>

        <!-- Validation display customization slot -->
        <slot name="validation"
              :errors="pipelineValidationErrors"
              :hasErrors="hasPipelineErrors"
              :error="error">
          <!-- Default validation display -->
          <div v-if="hasPipelineErrors" class="validation-errors mt-2">
            <v-alert
                v-for="error in pipelineValidationErrors"
                :key="error"
                type="error"
                density="compact"
                class="mb-1"
            >
              {{ error }}
            </v-alert>
          </div>

          <v-alert v-if="error" type="error" class="mt-4">
            <strong>Error:</strong> {{ error }}
          </v-alert>
        </slot>
        <template v-if="viewMode === 'stages'" class="stages-view">
          <v-expansion-panels v-model="expandedPanels" multiple>
            <template v-for="(stage, index) in stages" :key="index">
              <VStageCard
                  :stage="stage"
                  :index="index"
                  :total-stages="stages.length"
                  @update="updateStage"
                  @delete="removeStage"
                  @move-up="moveStageUp"
                  @move-down="moveStageDown" />
            </template>
          </v-expansion-panels>
        </template>

        <template v-else class="text-view">
          <div class="d-flex align-center mb-2">
            <v-spacer />
            <v-btn size="small" @click="validateCurrentText" color="primary" variant="outlined">
              Validate
            </v-btn>
          </div>
          <JsonTextarea
              v-model="textAreaContent"
              :class="{ 'text-error': hasPipelineErrors }"
              label="Aggregation Pipeline JSON"
              placeholder="Paste your aggregation pipeline JSON here..."
              :rows="15"
          />
        </template>
      </v-col>
      <v-col cols="12" md="4">
        <v-output-panel :pipeline="stages" @export="exportPipeline" />

        <!-- Output panel customization slot -->
        <slot name="output" :pipeline="stages">
          <!-- Default VOutputPanel is above -->
        </slot>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Pipeline, AggregationStage } from '../types'
import VStageCard from './VStageCard.vue'
import VOutputPanel from './VOutputPanel.vue'
import JsonTextarea from './JsonTextarea.vue'
import { validateAggregationPipeline } from '../validation'

interface Props {
  initialPipeline?: Pipeline
}

const props = withDefaults(defineProps<Props>(), {
  initialPipeline: () => []
})

const emit = defineEmits<{
  pipelineChange: [pipeline: Pipeline]
  exportPipeline: [pipeline: Pipeline]
}>()

const stages = ref<Pipeline>(props.initialPipeline || [])
const viewMode = ref<'stages' | 'text'>('stages')
const error = ref<string>('')
const pipelineValidationErrors = ref<string[]>([])
const hasPipelineErrors = computed(() => pipelineValidationErrors.value.length > 0)
const expandedPanels = ref<number[]>(props.initialPipeline ? props.initialPipeline.map((_, index) => index) : [])
const textAreaContent = ref<string>(JSON.stringify(props.initialPipeline || [], null, 2))

const pipelineJson = computed(() => JSON.stringify(stages.value, null, 2))

// Watch for stage changes to sync textarea content
watch(stages, () => {
  if (viewMode.value === 'text') {
    textAreaContent.value = pipelineJson.value
  }
}, { deep: true })

const viewModeOptions = [
  { title: 'Stages View', value: 'stages' },
  { title: 'Text View', value: 'text' }
]

const getStageType = (stage: AggregationStage): string => {
  return Object.keys(stage)[0] || 'unknown'
}

const exportPipeline = () => {
  emit('exportPipeline', stages.value)
}

const emitPipelineChange = () => {
  emit('pipelineChange', stages.value)
}

const addStage = () => {
  const newIndex = stages.value.length
  stages.value.push({ $match: { status: "active" } } as AggregationStage)
  emitPipelineChange()
}

const expandAllStages = () => {
  expandedPanels.value = stages.value.map((_, index) => index)
}

const collapseAllStages = () => {
  expandedPanels.value = []
}

const removeStage = (index: number) => {
  stages.value.splice(index, 1)
  // Remove the expansion state for this index and adjust other indices
  expandedPanels.value = expandedPanels.value
    .filter(panelIndex => panelIndex !== index)
    .map(panelIndex => panelIndex > index ? panelIndex - 1 : panelIndex)
  validatePipelineFromText(pipelineJson.value)
  emitPipelineChange()
}

const updateStage = (index: number, stage: AggregationStage) => {
  stages.value[index] = stage
  validatePipelineFromText(pipelineJson.value)
  emitPipelineChange()
}

const moveStageUp = (index: number) => {
  if (index > 0) {
    [stages.value[index - 1], stages.value[index]] = [stages.value[index]!, stages.value[index - 1]!]
    // Adjust expansion indices
    const newExpandedPanels = [...expandedPanels.value]
    const currentIndex = newExpandedPanels.indexOf(index)
    const prevIndex = newExpandedPanels.indexOf(index - 1)
    
    if (currentIndex !== -1) newExpandedPanels[currentIndex] = index - 1
    if (prevIndex !== -1) newExpandedPanels[prevIndex] = index
    
    expandedPanels.value = newExpandedPanels
    validatePipelineFromText(pipelineJson.value)
    emitPipelineChange()
  }
}

const moveStageDown = (index: number) => {
  if (index < stages.value.length - 1) {
    [stages.value[index], stages.value[index + 1]] = [stages.value[index + 1]!, stages.value[index]!]
    // Adjust expansion indices
    const newExpandedPanels = [...expandedPanels.value]
    const currentIndex = newExpandedPanels.indexOf(index)
    const nextIndex = newExpandedPanels.indexOf(index + 1)
    
    if (currentIndex !== -1) newExpandedPanels[currentIndex] = index + 1
    if (nextIndex !== -1) newExpandedPanels[nextIndex] = index
    
    expandedPanels.value = newExpandedPanels
    validatePipelineFromText(pipelineJson.value)
    emitPipelineChange()
  }
}

const onTextAreaChange = (value: string) => {
  textAreaContent.value = value
  // Always validate the current text input
  validatePipelineFromText(value)
  // Update the pipeline if valid, but keep the text as-is for editing
  updatePipelineFromText(value)
}

const validateCurrentText = () => {
  validatePipelineFromText(textAreaContent.value)
}

const validatePipelineFromText = (text: string) => {
  pipelineValidationErrors.value = []
  
  if (!text.trim()) {
    return // Empty is valid
  }
  
  try {
    const parsed = JSON.parse(text)
    
    if (!Array.isArray(parsed)) {
      pipelineValidationErrors.value.push('Aggregation pipeline must be an array of stage objects')
      return
    }
    
    // Validate each stage
    const validation = validateAggregationPipeline(text)
    
    if (!validation.isValid) {
      pipelineValidationErrors.value = validation.errors.map(error => error.message)
    }
    
    if (validation.warnings.length > 0) {
      validation.warnings.forEach(warning => {
        pipelineValidationErrors.value.push(`Warning: ${warning.message}`)
      })
    }
    
  } catch (e) {
    pipelineValidationErrors.value = ['Invalid JSON syntax']
  }
}

const updatePipelineFromText = (text: string) => {
  try {
    const parsed = JSON.parse(text)
    if (Array.isArray(parsed)) {
      stages.value = parsed
      emitPipelineChange()
    }
  } catch (e) {
    // Keep existing stages if JSON is invalid
  }
}
</script>

<style scoped>

</style>