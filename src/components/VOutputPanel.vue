<template>
  <div class="v-output-panel">
    <v-card elevation="1" class="mt-6">
      <v-card-title>Output</v-card-title>
      <v-card-text>
        <v-tabs v-model="activeTab" color="primary">
          <v-tab value="json">JSON Pipeline</v-tab>
          <v-tab value="query">MongoDB Query</v-tab>
        </v-tabs>

        <v-window v-model="activeTab" class="mt-4">
          <v-window-item value="json">
            <v-code>
              <pre>{{ pipelineJson }}</pre>
            </v-code>
          </v-window-item>

          <v-window-item value="query">
            <v-code>
              <pre>{{ mongodbQuery }}</pre>
            </v-code>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Pipeline } from '../types'

interface Props {
  pipeline: Pipeline
}

const props = defineProps<Props>()

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
