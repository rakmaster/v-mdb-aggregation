# Vuetify-Style Slot Architecture Implementation

The MongoDB Aggregation Builder component has been transformed from a monolithic "cobbled together" structure into a highly flexible, Vuetify-standard component using advanced slot patterns inspired by `v-data-table`, `v-app-bar`, and other complex Vuetify components.

## Key Architectural Changes

### 1. Scoped Slots with Contextual Data
All customization slots receive relevant contextual data as scoped props:

```vue
<slot name="stage"
      :stage="stage"
      :index="index"
      :totalStages="stages.length"
      :isExpanded="expandedPanels.includes(index)"
      :updateStage="updateStage"
      :removeStage="removeStage"
      :moveStageUp="moveStageUp"
      :moveStageDown="moveStageDown">
```

### 2. Hierarchical Slot Priority System
1. **Stage-type slots** (e.g., `stage-$match`) take precedence over general `Stage` slot
2. **General slots** provide fallbacks with default implementations
3. **Default implementations** ensure backwards compatibility
- `viewMode`: Current view mode ('stages' | 'text')
- `addStage`: Function to add new stage
- `expandAllStages`: Function to expand all stages
- `collapseAllStages`: Function to collapse all stages
- `exportPipeline`: Function to export pipeline

**Sub-slots:**
- `toolbar-prepend`: Content before default toolbar items
- `toolbar-actions`: Additional toolbar actions
- `toolbar-append`: Content after default toolbar items

### Stage Rendering

#### `stage` - Individual stage customization
**Scoped Props:** (see above)
Allows complete replacement of how any stage is rendered.

#### `stage-{type}` - Stage-type specific customization
Examples: `stage-$match`, `stage-$group`, `stage-$project`
Allows customization of specific aggregation operations.

### Validation Display

#### `validation` - Custom error display
**Scoped Props:**
- `errors`: Array of validation error messages
- `hasErrors`: Boolean indicating if there are errors
- `error`: General error message

### Output Panel

#### `output` - Custom output rendering
**Scoped Props:**
- `pipeline`: Complete aggregation pipeline array

## Usage Examples

### Basic Toolbar Customization

```vue
<v-mongo-aggregation-builder>
  <template #toolbar="{ addStage, exportPipeline }">
    <v-toolbar>
      <v-btn @click="addStage" color="success">
        Add New Stage
      </v-btn>
      <v-spacer />
      <v-btn @click="exportPipeline">
        Save Pipeline
      </v-btn>
    </v-toolbar>
  </template>
</v-mongo-aggregation-builder>
```

### Custom Stage Rendering

```vue
<v-mongo-aggregation-builder>
  <template #stage="{ stage, index, updateStage, removeStage }">
    <v-card variant="outlined" class="my-2">
      <v-card-title>
        Stage {{ index + 1 }}
        <v-spacer />
        <v-btn @click="removeStage(index)" icon="mdi-delete" />
      </v-card-title>
      <v-card-text>
        <v-textarea
          :model-value="JSON.stringify(stage, null, 2)"
          @update:model-value="(val) => updateStage(index, JSON.parse(val))"
          label="Stage Configuration"
        />
      </v-card-text>
    </v-card>
  </template>
</v-mongo-aggregation-builder>
```

### Stage-Type Specific Customization

```vue
<v-mongo-aggregation-builder>
  <!-- Custom $match stage -->
  <template #stage-$match="{ stage, index, updateStage }">
    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon color="success">mdi-filter</v-icon>
        Filter Stage {{ index + 1 }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <!-- Custom filter builder UI -->
      </v-expansion-panel-text>
    </v-expansion-panel>
  </template>
</v-mongo-aggregation-builder>
```

### Custom Validation Display

```vue
<v-mongo-aggregation-builder>
  <template #validation="{ errors, hasErrors }">
    <v-snackbar v-model="hasErrors" color="error">
      <div v-for="error in errors" :key="error">
        {{ error }}
      </div>
    </v-snackbar>
  </template>
</v-mongo-aggregation-builder>
```

### Custom Output Panel

```vue
<v-mongo-aggregation-builder>
  <template #output="{ pipeline }">
    <v-tabs>
      <v-tab>JSON</v-tab>
      <v-tab>MongoDB Shell</v-tab>
      <v-tab-item>
        <pre>{{ JSON.stringify(pipeline, null, 2) }}</pre>
      </v-tab-item>
      <v-tab-item>
        <pre>db.collection.aggregate({{ JSON.stringify(pipeline, null, 2) }})</pre>
      </v-tab-item>
    </v-tabs>
  </template>
</v-mongo-aggregation-builder>
```

## Benefits

### 1. **Vuetify Consistency**
- Follows the same patterns as `v-data-table`, `v-app-bar`, etc.
- Familiar API for Vuetify developers

### 2. **Maximum Flexibility**
- Every aspect of the UI can be customized
- Complete control over rendering and behavior

### 3. **Backwards Compatibility**
- Existing usage continues to work unchanged
- Default implementations provided for all slots

### 4. **Composable Architecture**
- Easy to extend and modify for specific use cases
- Clean separation of concerns

### 5. **Type Safety**
- Full TypeScript support for scoped slot props
- IntelliSense support in IDEs

### 6. **Syntax Highlighting**
- JSON syntax highlighting in Text View using Prism.js
- **Syntax highlighting also available in Stages View** for individual stage editing
- Maintains full textarea functionality (editing, scrolling, validation)
- Automatic formatting of valid JSON for better readability

## Comparison with Original Architecture

| Aspect | Original | Vuetify-Style |
|--------|----------|---------------|
| Toolbar | Hard-coded | Fully customizable |
| Stage Rendering | Fixed VStageCard | Scoped slots for each stage |
| Validation | Fixed alerts | Customizable error display |
| Output | Fixed VOutputPanel | Customizable output rendering |
| Flexibility | Low | Maximum |
| Maintainability | Monolithic | Composable |

## Implementation Details

### Slot Priority System
1. **Stage-type slots** (e.g., `stage-$match`) take precedence over general `Stage` slot
2. **General slots** provide fallbacks with default implementations
3. **Default implementations** ensure backwards compatibility

### Syntax Highlighting Implementation
- Uses Prism.js for JSON syntax highlighting
- Custom `JsonTextarea` component overlays highlighted code behind transparent textarea
- Maintains full editing functionality while providing visual syntax highlighting
- Automatically formats valid JSON for improved readability

### Performance Considerations
- Slots are only rendered when used (Vue's slot optimization)
- Dynamic slot forwarding is efficient and doesn't impact unused slots
- Scoped props are reactive and update automatically
### Best Practices
1. **Provide defaults**: Always include default implementations in slots
2. **Preserve functionality**: Ensure scoped methods are properly bound
3. **Maintain reactivity**: Use computed props for derived data
4. **Type safety**: Leverage TypeScript for slot prop validation

This architecture transforms the component from a basic tool into a highly flexible, enterprise-ready UI component that rivals the customization capabilities of Vuetify's most advanced components.
