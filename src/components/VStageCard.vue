<template>
  <v-card class="stage-card" elevation="2">
    <v-card-title class="stage-header">
      <div class="stage-info">
        <span class="stage-number">Stage {{ index + 1 }}</span>
        <v-chip size="small" color="primary" variant="outlined">
          {{ getStageType(stage) }}
        </v-chip>
      </div>

      <v-spacer />

      <div class="stage-actions">
        <v-btn
          v-if="index > 0"
          icon="mdi-arrow-up"
          size="small"
          variant="text"
          @click="$emit('move-up', index)"
        />
        <v-btn
          v-if="index < totalStages - 1"
          icon="mdi-arrow-down"
          size="small"
          variant="text"
          @click="$emit('move-down', index)"
        />
        <v-btn
          icon="mdi-delete"
          size="small"
          color="error"
          variant="text"
          @click="$emit('delete', index)"
        />
      </div>
    </v-card-title>

    <v-card-text>
      <v-select
        v-model="selectedStageType"
        :items="stageTypeOptions"
        label="Stage Type"
        density="compact"
        @update:model-value="updateStageType"
      />

      <v-textarea
        v-model="stageJson"
        :class="{ 'v-text-field--error': hasErrors }"
        label="Stage Configuration (JSON)"
        placeholder='{"$match": {"status": "active"}}'
        rows="8"
        auto-grow
        @update:model-value="updateStageJson"
      />

      <div v-if="hasErrors" class="validation-errors mt-2">
        <v-alert
          v-for="error in validationErrors"
          :key="error"
          type="error"
          density="compact"
          class="mb-1"
        >
          {{ error }}
        </v-alert>
      </div>

      <div v-if="stagePreview && Object.keys(stagePreview).length > 0" class="stage-preview mt-4">
        <v-divider class="mb-3" />
        <h4 class="text-h6 mb-2">Preview</h4>
        <v-code>
          <pre>{{ JSON.stringify(stagePreview, null, 2) }}</pre>
        </v-code>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { AggregationStage } from '../types'
import { validateAggregationPipeline } from '../validation'

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

const updateStageJson = () => {
  validationErrors.value = []
  updateStage()
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
</script>

<style scoped>
.stage-card {
  margin-bottom: 1rem;
}

.stage-header {
  padding-bottom: 8px;
}

.stage-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stage-number {
  font-weight: 600;
}

.stage-actions {
  display: flex;
  gap: 0.25rem;
}

.stage-preview {
  border-top: 1px solid rgb(var(--v-theme-outline));
  padding-top: 1rem;
}

.stage-preview h4 {
  margin-bottom: 0.5rem;
}

.validation-errors {
  margin-top: 0.5rem;
}
</style>
