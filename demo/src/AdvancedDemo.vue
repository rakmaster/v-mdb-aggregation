<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>V-MongoDB Aggregation Builder - Advanced Demo</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-card class="pa-6">
          <v-card-title>Advanced Customization Demo</v-card-title>
          <v-card-subtitle>
            Demonstrating Vuetify-style slot architecture for maximum flexibility
          </v-card-subtitle>

          <!-- Custom toolbar with additional actions -->
          <template #toolbar="{ stages, addStage, exportPipeline }">
            <v-toolbar>
              <v-toolbar-title>MongoDB Pipeline Builder</v-toolbar-title>

              <v-btn @click="addStage" color="success" prepend-icon="mdi-plus">
                Add Stage
              </v-btn>

              <v-spacer />

              <v-btn @click="exportPipeline" color="primary" prepend-icon="mdi-download">
                Export JSON
              </v-btn>

              <v-btn @click="importPipeline" variant="outlined" prepend-icon="mdi-upload">
                Import JSON
              </v-btn>

              <v-btn @click="clearPipeline" color="error" prepend-icon="mdi-delete-sweep">
                Clear All
              </v-btn>
            </v-toolbar>
          </template>

          <!-- Custom $match stage rendering -->
          <template #stage-$match="{ stage, index, updateStage, removeStage }">
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-row align="center">
                  <v-col cols="auto">
                    <v-icon color="success">mdi-filter</v-icon>
                  </v-col>
                  <v-col>
                    <strong>Stage {{ index + 1 }}: Filter Documents</strong>
                  </v-col>
                  <v-col cols="auto">
                    <v-chip color="success" variant="flat">$match</v-chip>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn icon="mdi-delete" color="error" @click.stop="removeStage(index)" />
                  </v-col>
                </v-row>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-text-field
                  :model-value="JSON.stringify(stage.$match, null, 2)"
                  @update:model-value="(val) => updateStage(index, { $match: JSON.parse(val) })"
                  label="Filter Query (JSON)"
                  placeholder='{"status": "active", "age": {$gte: 18}}'
                  variant="outlined"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </template>

          <!-- Custom $group stage with enhanced UI -->
          <template #stage-$group="{ stage, index, updateStage, removeStage }">
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-row align="center">
                  <v-col cols="auto">
                    <v-icon color="primary">mdi-group</v-icon>
                  </v-col>
                  <v-col>
                    <strong>Stage {{ index + 1 }}: Group Documents</strong>
                  </v-col>
                  <v-col cols="auto">
                    <v-chip color="primary" variant="flat">$group</v-chip>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn icon="mdi-delete" color="error" @click.stop="removeStage(index)" />
                  </v-col>
                </v-row>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="_id field"
                      :model-value="stage.$group._id"
                      @update:model-value="(val) => updateStage(index, {
                        $group: { ...stage.$group, _id: val }
                      })"
                      placeholder="'$category' or null for all docs"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Additional accumulators (JSON)"
                      :model-value="JSON.stringify(Object.fromEntries(
                        Object.entries(stage.$group).filter(([key]) => key !== '_id')
                      ), null, 2)"
                      @update:model-value="(val) => {
                        const accumulators = JSON.parse(val)
                        updateStage(index, {
                          $group: { _id: stage.$group._id, ...accumulators }
                        })
                      }"
                      variant="outlined"
                    />
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </template>

          <!-- Custom validation display -->
          <template #validation="{ errors, hasErrors }">
            <v-alert v-if="hasErrors" type="error" class="mt-4" dismissible>
              <v-alert-title>Pipeline Validation Errors</v-alert-title>
              <ul class="mb-0">
                <li v-for="error in errors" :key="error">{{ error }}</li>
              </ul>
            </v-alert>
          </template>

          <!-- Custom output panel -->
          <template #output="{ pipeline }">
            <v-card class="mt-6">
              <v-card-title>Pipeline Output</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <h4>JSON Format</h4>
                    <v-code>
                      <pre>{{ JSON.stringify(pipeline, null, 2) }}</pre>
                    </v-code>
                  </v-col>
                  <v-col cols="12" md="6">
                    <h4>MongoDB Shell Command</h4>
                    <v-code>
                      <pre>db.collection.aggregate({{ JSON.stringify(pipeline, null, 2) }})</pre>
                    </v-code>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </template>

          <!-- The main component -->
          <v-mongo-aggregation-builder
            :initial-pipeline="initialPipeline"
            @pipeline-change="onPipelineChange"
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

const importPipeline = () => {
  const json = prompt('Paste your aggregation pipeline JSON:')
  if (json) {
    try {
      const pipeline = JSON.parse(json)
      // In a real app, you'd update the component's pipeline here
      console.log('Imported pipeline:', pipeline)
    } catch (e) {
      alert('Invalid JSON')
    }
  }
}

const clearPipeline = () => {
  if (confirm('Are you sure you want to clear all stages?')) {
    // In a real app, you'd clear the pipeline here
    console.log('Pipeline cleared')
  }
}
</script>
