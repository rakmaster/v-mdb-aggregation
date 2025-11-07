<template>
  <v-row>
    <v-col>
    <v-card>
      <v-card-title class="d-flex align-center">
        <span>Output</span>
        <v-spacer />
        <v-btn @click="$emit('export')" size="small">
          Export
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-tabs v-model="activeTab" color="primary">
          <v-tab value="json">JSON</v-tab>
          <v-tab value="query">Query</v-tab>
        </v-tabs>

        <v-window v-model="activeTab" class="mt-4">
          <v-window-item value="json">
            <pre>{{ pipelineJson }}</pre>
          </v-window-item>

          <v-window-item value="query">
              <pre>{{ mongodbQuery }}</pre>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Pipeline } from '../types'

interface Props {
  pipeline: Pipeline
}

const props = defineProps<Props>()

const emit = defineEmits<{
  export: []
}>()

const activeTab = ref<'json' | 'query'>('json')

const pipelineJson = computed(() => JSON.stringify(props.pipeline, null, 2))

const mongodbQuery = computed(() => {
  const query = `db.collection.aggregate(${JSON.stringify(props.pipeline, null, 2)})`
  return query
})
</script>

<style scoped>
.v-output-panel {
  /* Vuetify handles the styling */
}
</style>
