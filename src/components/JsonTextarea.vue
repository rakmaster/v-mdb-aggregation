<template>
  <div class="v-syntax-highlighted-textarea">
    <pre class="v-syntax-highlighted-code"><code class="language-json">{{ highlightedCode }}</code></pre>
    <div
      contenteditable="true"
      class="v-syntax-textarea"
      :class="textareaClass"
      @input="handleInput"
      @scroll="syncScroll"
      spellcheck="false"
      v-text="localValue"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, nextTick, ref } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-json'

interface Props {
  modelValue: string
  placeholder?: string
  rows?: number | string
  disabled?: boolean
  readonly?: boolean
  textareaClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  rows: 10,
  disabled: false,
  readonly: false,
  textareaClass: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const localValue = ref(props.modelValue)

const highlightedCode = computed(() => {
  try {
    // Format the JSON for better readability if it's valid
    const parsed = JSON.parse(localValue.value || '{}')
    return JSON.stringify(parsed, null, 2)
  } catch {
    // If invalid JSON, just return as-is for highlighting
    return localValue.value || ''
  }
})

// Sync prop changes to local value
  localValue.value = newValue
})

// Emit changes when local value changes
watch(localValue, (newValue) => {
  emit('update:modelValue', newValue)
})

// Sync scroll between contenteditable and pre
const syncScroll = (event: Event) => {
  const target = event.target as HTMLElement
  const preElement = target.parentElement?.querySelector('.v-syntax-highlighted-code') as HTMLElement
  if (preElement) {
    preElement.scrollTop = target.scrollTop
    preElement.scrollLeft = target.scrollLeft
  }
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLElement
  localValue.value = target.textContent || ''
}

// Re-highlight when content changes
watch(highlightedCode, () => {
  nextTick(() => {
    Prism.highlightAll()
  })
}, { immediate: true })
</script>

<style>
.v-syntax-highlighted-textarea {
  position: relative;
  width: 100%;
  display: inline-block;
  min-width: 100%;
}

.v-syntax-highlighted-code {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 12px 16px;
  font-family: 'Roboto Mono', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: transparent !important;
  background: transparent !important;
  border: none !important;
  outline: none !important;
  overflow: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  tab-size: 2;
  pointer-events: none;
  z-index: 1;
  box-sizing: border-box;
  /* Ensure identical rendering */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.v-syntax-textarea {
  width: 100%;
  min-height: 200px;
  margin: 0;
  padding: 12px 16px;
  font-family: 'Roboto Mono', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87) !important;
  caret-color: rgba(0, 0, 0, 0.87);
  outline: none;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  tab-size: 2;
  box-sizing: border-box;
  z-index: 2;
  /* Contenteditable specific styles */
  display: block;
  resize: vertical;
  /* Ensure identical rendering */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  /* Prevent Vuetify overrides */
  font-weight: 400 !important;
  letter-spacing: normal !important;
  /* Contenteditable behavior */
  -webkit-user-modify: read-write-plaintext-only;
  -moz-user-modify: read-write-plaintext-only;
  user-modify: read-write-plaintext-only;
}

.v-syntax-textarea:focus {
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}

.v-syntax-textarea.text-error {
  border-color: #d32f2f;
}

.v-syntax-textarea.text-error:focus {
  border-color: #d32f2f;
  box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.2);
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .v-syntax-textarea {
    caret-color: rgba(255, 255, 255, 0.87);
    color: rgba(255, 255, 255, 0.87) !important;
  }

  .v-syntax-textarea:focus {
    border-color: #90caf9;
    box-shadow: 0 0 0 2px rgba(144, 202, 249, 0.2);
  }

  .v-syntax-textarea.text-error {
    border-color: #f48fb1;
  }

  .v-syntax-textarea.text-error:focus {
    border-color: #f48fb1;
    box-shadow: 0 0 0 2px rgba(244, 143, 177, 0.2);
  }
}

/* Prevent contenteditable default styles */
.v-syntax-textarea:empty::before {
  content: attr(data-placeholder);
  color: rgba(0, 0, 0, 0.38);
  pointer-events: none;
}

@media (prefers-color-scheme: dark) {
  .v-syntax-textarea:empty::before {
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
