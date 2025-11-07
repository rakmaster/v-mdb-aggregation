<template>
  <div class="syntax-highlighted-textarea">
    <pre class="syntax-highlighted-code"><code class="language-json">{{ highlightedCode }}</code></pre>
    <textarea
      v-model="localValue"
      :class="textareaClass"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      :readonly="readonly"
      @scroll="syncScroll"
      class="syntax-textarea"
      spellcheck="false"
    ></textarea>
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
watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue
})

// Emit changes when local value changes
watch(localValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const syncScroll = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement
  const pre = textarea.parentElement?.querySelector('.syntax-highlighted-code') as HTMLElement
  if (pre) {
    pre.scrollTop = textarea.scrollTop
    pre.scrollLeft = textarea.scrollLeft
  }
}

// Re-highlight when content changes
watch(highlightedCode, () => {
  nextTick(() => {
    Prism.highlightAll()
  })
}, { immediate: true })
</script>

<style scoped>
.syntax-highlighted-textarea {
  position: relative;
  width: 100%;
  display: inline-block;
  min-width: 100%;
}

.syntax-highlighted-code {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 12px 16px;
  font-family: 'Roboto Mono', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: transparent;
  background: transparent;
  border: none;
  outline: none;
  overflow: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  tab-size: 2;
  pointer-events: none;
  z-index: 1;
  /* Ensure it matches textarea sizing */
  box-sizing: border-box;
}

.syntax-textarea {
  width: 100%;
  margin: 0;
  padding: 12px 16px;
  font-family: 'Roboto Mono', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
  caret-color: rgba(0, 0, 0, 0.87);
  outline: none;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  tab-size: 2;
  resize: vertical;
  box-sizing: border-box;
  z-index: 2;
  min-height: 200px; /* Minimum height for usability */
}

.syntax-textarea:focus {
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}

.syntax-textarea.text-error {
  border-color: #d32f2f;
}

.syntax-textarea.text-error:focus {
  border-color: #d32f2f;
  box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.2);
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .syntax-textarea {
    caret-color: rgba(255, 255, 255, 0.87);
  }

  .syntax-textarea:focus {
    border-color: #90caf9;
    box-shadow: 0 0 0 2px rgba(144, 202, 249, 0.2);
  }

  .syntax-textarea.text-error {
    border-color: #f48fb1;
  }

  .syntax-textarea.text-error:focus {
    border-color: #f48fb1;
    box-shadow: 0 0 0 2px rgba(244, 143, 177, 0.2);
  }
}
</style>
