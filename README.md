# V-MongoDB Aggregation Builder

A Vuetify-based GUI component for building MongoDB aggregation pipelines, inspired by MongoDB Compass. This component integrates seamlessly with Vuetify applications.

## Features

- **Visual Pipeline Builder**: Drag-and-drop interface for creating aggregation stages
- **Complete Stage Support**: All 42 MongoDB aggregation pipeline stages
- **Multiple Views**: Switch between visual Stages View and raw JSON Text View
- **Real-time Output**: Generate JSON pipeline and MongoDB query formats instantly
- **Vuetify Integration**: Fully integrated with Vuetify's theming and component system
- **TypeScript Support**: Full TypeScript definitions for all stages and configurations

## Installation

```bash
npm install @rakmaster/v-mdb-aggregation vuetify
```

## Usage

```vue
<template>
  <v-app>
    <v-container>
      <v-mongo-aggregation-builder
        :initial-pipeline="existingPipeline"
        @pipeline-change="onPipelineChange"
        @export-pipeline="onExportPipeline"
      />
    </v-container>
  </v-app>
</template>

<script setup>
import { VMongoAggregationBuilder } from '@rakmaster/v-mdb-aggregation'

const existingPipeline = [
  { "$match": { "status": "active" } },
  { "$group": { "_id": "$category", "count": { "$sum": 1 } } }
]

const onPipelineChange = (pipeline) => {
  console.log('Pipeline updated:', pipeline)
  // Save to your backend or local storage
}

const onExportPipeline = (pipeline) => {
  console.log('Export requested:', pipeline)
  // Handle export (copy to clipboard, download file, etc.)
}
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialPipeline` | `Pipeline` | `[]` | Initial aggregation pipeline to load |

## Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `pipelineChange` | `pipeline: Pipeline` | Emitted when the pipeline changes |
| `exportPipeline` | `pipeline: Pipeline` | Emitted when export button is clicked |

## Supported Aggregation Stages

The component supports all 42 MongoDB aggregation pipeline stages:

**Core Stages:**
- `$match`, `$group`, `$project`, `$sort`, `$limit`, `$skip`, `$count`, `$unwind`

**Field Operations:**
- `$addFields`, `$set`, `$unset`, `$replaceRoot`, `$replaceWith`

**Array Operations:**
- `$unwind`

**Join Operations:**
- `$lookup`, `$graphLookup`, `$unionWith`

**Grouping & Bucketing:**
- `$bucket`, `$bucketAuto`, `$sortByCount`, `$facet`

**Search:**
- `$search`, `$searchMeta`

**Output & Merge:**
- `$out`, `$merge`

**Advanced:**
- `$sample`, `$redact`, `$collStats`, `$indexStats`, `$currentOp`, `$listSessions`, `$listLocalSessions`, `$planCacheStats`, `$changeStream`, `$changeStreamSplitLargeEvent`, `$densify`, `$fill`, `$setWindowFields`, `$shardedDataDistribution`, `$documents`

## Development

```bash
npm install
npm run dev    # Watch mode
npm run build  # Build for production
```

## License

MIT
