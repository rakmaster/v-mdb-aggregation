<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <v-row align="center">
        <v-col cols="auto">
          <span class="stage-number">Stage {{ index + 1 }}</span>
        </v-col>
        <v-col cols="auto">
          <v-chip size="small" color="primary" variant="outlined">
            {{ selectedStageType || 'Select Type' }}
          </v-chip>
        </v-col>
        <v-col>
          <v-select
              v-model="selectedStageType"
              :items="stageTypeOptions"
              label="Stage Type"
              density="compact"
              hide-details
              @update:model-value="updateStageType"></v-select>
        </v-col>
        <v-col cols="auto">
          <v-btn-group>
            <v-btn
              v-if="index > 0"
              icon="mdi-arrow-up"
              size="small"
              variant="text"
              @click.stop="$emit('move-up', index)"
            />
            <v-btn
              v-if="index < totalStages - 1"
              icon="mdi-arrow-down"
              size="small"
              variant="text"
              @click.stop="$emit('move-down', index)"
            />
            <v-btn
              icon="mdi-delete-outline"
              size="small"
              color="error"
              variant="text"
              @click.stop="$emit('delete', index)"
            />
          </v-btn-group>
        </v-col>
      </v-row>
    </v-expansion-panel-title>

    <v-expansion-panel-text>
      <template v-if="hasErrors">
        <v-alert
            v-for="error in validationErrors"
            :key="error"
            type="error"
            density="compact"
            class="mb-1"
        >
          {{ error }}
        </v-alert>
      </template>

      <v-row>
        <v-col cols="12" md="8">
          <JsonTextarea
              v-model="stageJson"
              :class="{ 'text-error': hasErrors }"
              label="Stage Configuration (JSON)"
              placeholder='{"$match": {"status": "active"}}'
              :rows="8"
          />
        </v-col>
        <v-col cols="12" md="4">
          <div class="preview-box">
            <div class="preview-box-label">
              Preview
            </div>
            <div class="preview-box-content">
              <pre>{{ JSON.stringify(stagePreview, null, 2) }}</pre>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { AggregationStage } from '../types'
import { validateAggregationPipeline } from '../validation'
import JsonTextarea from './JsonTextarea.vue'

interface Props {
  stage: AggregationStage
  index: number
  totalStages: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  update: [index: number, stage: AggregationStage]
  delete: [index: number]
  'move-up': [index: number]
  'move-down': [index: number]
}>()

const selectedStageType = ref<string>('')
const stageJson = ref<string>('')
const validationErrors = ref<string[]>([])

const stageTypeOptions = [
  { title: '$match', value: '$match' },
  { title: '$group', value: '$group' },
  { title: '$project', value: '$project' },
  { title: '$sort', value: '$sort' },
  { title: '$limit', value: '$limit' },
  { title: '$skip', value: '$skip' },
  { title: '$count', value: '$count' },
  { title: '$unwind', value: '$unwind' },
  { title: '$lookup', value: '$lookup' },
  { title: '$addFields', value: '$addFields' },
  { title: '$set', value: '$set' },
  { title: '$unset', value: '$unset' },
  { title: '$replaceRoot', value: '$replaceRoot' },
  { title: '$facet', value: '$facet' },
  { title: '$bucket', value: '$bucket' },
  { title: '$bucketAuto', value: '$bucketAuto' },
  { title: '$sortByCount', value: '$sortByCount' },
  { title: '$graphLookup', value: '$graphLookup' },
  { title: '$unionWith', value: '$unionWith' },
  { title: '$search', value: '$search' },
  { title: '$searchMeta', value: '$searchMeta' },
  { title: '$out', value: '$out' },
  { title: '$merge', value: '$merge' }
]

const hasErrors = computed(() => validationErrors.value.length > 0)

const stagePreview = computed(() => {
  try {
    return JSON.parse(stageJson.value)
  } catch {
    return null
  }
})

const getStageType = (stage: AggregationStage): string => {
  return Object.keys(stage)[0] || 'Unknown'
}

const updateStageType = (newType: string) => {
  try {
    const currentConfig = JSON.parse(stageJson.value)
    const newStage = { [newType]: currentConfig[Object.keys(currentConfig)[0]!] || {} }
    stageJson.value = JSON.stringify(newStage, null, 2)
    updateStage()
  } catch {
    const newStage = { [newType]: {} }
    stageJson.value = JSON.stringify(newStage, null, 2)
    updateStage()
  }
}

const updateStage = () => {
  try {
    const parsedStage = JSON.parse(stageJson.value)
    emit('update', props.index, parsedStage)
  } catch {
    validationErrors.value = ['Invalid JSON syntax']
  }
}

watch(() => props.stage, (newStage) => {
  selectedStageType.value = Object.keys(newStage)[0] || ''
  stageJson.value = JSON.stringify(newStage, null, 2)
  validationErrors.value = []
}, { immediate: true })

// Watch for stageJson changes from JsonTextarea
watch(stageJson, () => {
  validationErrors.value = []
  updateStage()
})
</script>

<style scoped>
.preview-box {
  position: relative;
  width: 100%;
  background: #F7F7F7;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

.preview-box-label {
  position: absolute;
  font-size: .9em;
  color: #818181;
  padding: .5em 1em;
}

.preview-box-content {
  padding: 1em;
  padding-top: 2em;
}

.preview-box-content pre {
  font-size: 12px;
  line-height: 1.4;
  margin: 0;
}
</style>
