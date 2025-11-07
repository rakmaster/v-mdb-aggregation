<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>V-MongoDB Aggregation Builder Demo</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-card class="pa-6">
          <v-card-title>Interactive Demo</v-card-title>
          <v-card-subtitle>
            Try building an aggregation pipeline below.
          </v-card-subtitle>

          <v-mongo-aggregation-builder
            :initial-pipeline="initialPipeline"
            @pipeline-change="onPipelineChange"
            @export-pipeline="onExportPipeline"
          />
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import VMongoAggregationBuilder from '../../src/components/VMongoAggregationBuilder.vue'

const initialPipeline = [
  { "$match": { "status": "active" } },
  { "$group": { "_id": "$category", "count": { "$sum": 1 } } }
]

const onPipelineChange = (pipeline: any) => {
  console.log('Pipeline changed:', pipeline)
}

const onExportPipeline = (pipeline: any) => {
  console.log('Export pipeline:', pipeline)
  const json = JSON.stringify(pipeline, null, 2)
  navigator.clipboard.writeText(json).then(() => {
    console.log('Pipeline copied to clipboard!')
  }).catch(err => {
    console.error('Failed to copy pipeline:', err)
  })
}
</script>
