<template>
  <div class="v-mongo-aggregation-builder">
    <div class="toolbar mb-4">
      <v-btn @click="addStage" color="primary" prepend-icon="mdi-plus">
        Add Stage
      </v-btn>
      <v-btn @click="exportPipeline" variant="outlined" prepend-icon="mdi-download">
        Export Pipeline
      </v-btn>
      <v-select
        v-model="viewMode"
        :items="viewModeOptions"
        label="View Mode"
        density="compact"
        style="max-width: 200px"
      />
    </div>

    <div v-if="viewMode === 'stages'" class="stages-view">
      <div class="stage-list">
        <v-stage-card
          v-for="(stage, index) in stages"
          :key="index"
          :stage="stage"
          :index="index"
          :total-stages="stages.length"
          @update="updateStage"
          @delete="removeStage"
          @move-up="moveStageUp"
          @move-down="moveStageDown"
        />
      </div>
    </div>

    <div v-else class="text-view">
      <v-textarea
        v-model="pipelineJson"
        @update:model-value="updatePipelineFromJson"
        :class="{ 'text-error': hasPipelineErrors }"
        label="Aggregation Pipeline JSON"
        placeholder="Paste your aggregation pipeline JSON here..."
        rows="15"
        auto-grow
      />

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
    </div>

    <v-alert v-if="error" type="error" class="mt-4">
      <strong>Error:</strong> {{ error }}
    </v-alert>

    <v-output-panel :pipeline="stages" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Pipeline, AggregationStage } from '../types'
import VStageCard from './VStageCard.vue'
import VOutputPanel from './VOutputPanel.vue'
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

const viewModeOptions = [
  { title: 'Stages View', value: 'stages' },
  { title: 'Text View', value: 'text' }
]

const pipelineJson = computed({
  get: () => JSON.stringify(stages.value, null, 2),
  set: (value: string) => {
    try {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) {
        stages.value = parsed
        validatePipeline()
      }
    } catch (e) {
      // Invalid JSON, show error
      pipelineValidationErrors.value = ['Invalid JSON syntax']
    }
  }
})

const addStage = () => {
  stages.value.push({ $match: { status: "active" } } as AggregationStage)
  emitPipelineChange()
}

const removeStage = (index: number) => {
  stages.value.splice(index, 1)
  validatePipeline()
  emitPipelineChange()
}

const updateStage = (index: number, stage: AggregationStage) => {
  stages.value[index] = stage
  validatePipeline()
  emitPipelineChange()
}

const moveStageUp = (index: number) => {
  if (index > 0) {
    [stages.value[index - 1], stages.value[index]] = [stages.value[index]!, stages.value[index - 1]!]
    validatePipeline()
    emitPipelineChange()
  }
}

const moveStageDown = (index: number) => {
  if (index < stages.value.length - 1) {
    [stages.value[index], stages.value[index + 1]] = [stages.value[index + 1]!, stages.value[index]!]
    validatePipeline()
    emitPipelineChange()
  }
}

const updatePipelineFromJson = () => {
  validatePipeline()
  emitPipelineChange()
}

const validatePipeline = () => {
  pipelineValidationErrors.value = []
  const validation = validateAggregationPipeline(pipelineJson.value)

  if (!validation.isValid) {
    pipelineValidationErrors.value = validation.errors.map(error => error.message)
  }

  if (validation.warnings.length > 0) {
    validation.warnings.forEach(warning => {
      pipelineValidationErrors.value.push(`Warning: ${warning.message}`)
    })
  }
}

const exportPipeline = () => {
  emit('exportPipeline', stages.value)
}

const emitPipelineChange = () => {
  emit('pipelineChange', stages.value)
}
</script>

<style scoped>
.v-mongo-aggregation-builder {
  /* Vuetify handles most styling */
}

.toolbar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.stage-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.text-view {
  margin-top: 1rem;
}
</style>
