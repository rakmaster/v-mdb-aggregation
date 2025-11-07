<template>
  <div class="v-mab-syntax-highlighted-textarea">
    <div
      contenteditable="true"
      class="v-mab-syntax-textarea"
      :class="textareaClass"
      @input="handleInput"
      @keydown="handleKeydown"
      @scroll="syncScroll"
      spellcheck="false"
      v-text="localValue"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, nextTick, ref, onUnmounted } from 'vue'
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
const highlightTimeout = ref<number>()

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

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue
})

// Emit changes when local value changes
watch(localValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLElement
  const text = target.textContent || ''
  localValue.value = text

  // Debounce highlighting to avoid excessive updates
  clearTimeout(highlightTimeout.value)
  highlightTimeout.value = setTimeout(() => {
    applyHighlighting()
  }, 100)
}

const handleKeydown = (event: KeyboardEvent) => {
  // Handle Tab key for indentation
  if (event.key === 'Tab') {
    event.preventDefault()
    const target = event.target as HTMLElement
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const tabNode = document.createTextNode('  ') // 2 spaces for tab
      range.insertNode(tabNode)
      range.setStartAfter(tabNode)
      range.setEndAfter(tabNode)
      selection.removeAllRanges()
      selection.addRange(range)

      // Update local value
      localValue.value = target.textContent || ''
    }
  }
}

const syncScroll = (event: Event) => {
  // Scroll syncing not needed since we removed the pre element
}

// Apply syntax highlighting directly to contenteditable
const applyHighlighting = () => {
  const element = document.querySelector('.v-mab-syntax-textarea') as HTMLElement
  if (!element) return

  const text = element.textContent || ''
  if (!text.trim()) return

  // Save cursor position
  let cursorOffset = 0
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    try {
      const range = selection.getRangeAt(0)
      const preCaretRange = range.cloneRange()
      preCaretRange.selectNodeContents(element)
      preCaretRange.setEnd(range.endContainer, range.endOffset)
      cursorOffset = preCaretRange.toString().length
    } catch (e) {
      // If cursor position can't be determined, reset to end
      cursorOffset = text.length
    }
  }

  try {
    // Format and highlight the JSON
    const parsed = JSON.parse(text)
    const formatted = JSON.stringify(parsed, null, 2)
    const highlighted = Prism.languages.json
      ? Prism.highlight(formatted, Prism.languages.json, 'json')
      : formatted

    // Apply highlighting
    element.innerHTML = highlighted

    // Restore cursor position
    if (cursorOffset > 0) {
      try {
        const textNodes = getTextNodes(element)
        let currentOffset = 0
        let targetNode = null
        let targetOffset = 0

        for (const node of textNodes) {
          if (currentOffset + node.textContent!.length >= cursorOffset) {
            targetNode = node
            targetOffset = cursorOffset - currentOffset
            break
          }
          currentOffset += node.textContent!.length
        }

        if (targetNode && selection) {
          const newRange = document.createRange()
          newRange.setStart(targetNode, Math.min(targetOffset, targetNode.textContent!.length))
          newRange.setEnd(targetNode, Math.min(targetOffset, targetNode.textContent!.length))
          selection.removeAllRanges()
          selection.addRange(newRange)
        }
      } catch (e) {
        // If cursor restoration fails, just continue
        console.warn('Failed to restore cursor position:', e)
      }
    }
  } catch {
    // If invalid JSON, just apply basic highlighting to the raw text
    const highlighted = Prism.languages.json
      ? Prism.highlight(text, Prism.languages.json, 'json')
      : text
    element.innerHTML = highlighted
  }
}

const getTextNodes = (element: Node): Text[] => {
  const textNodes: Text[] = []
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null)
  let node
  while (node = walker.nextNode()) {
    textNodes.push(node as Text)
  }
  return textNodes
}

// Watch for content changes and apply highlighting
watch(localValue, () => {
  nextTick(() => {
    // Only apply highlighting if not already scheduled
    if (!highlightTimeout.value) {
      applyHighlighting()
    }
  })
}, { immediate: true })

// Cleanup timeout on unmount
onUnmounted(() => {
  if (highlightTimeout.value) {
    clearTimeout(highlightTimeout.value)
    highlightTimeout.value = 0
  }
})
</script>

<style>
.v-mab-syntax-highlighted-textarea {
  position: relative;
  width: 100%;
  display: inline-block;
}

.v-mab-syntax-textarea {
  width: 100%;
  min-height: 200px;
  margin: 0;
  padding: 12px;
  outline: none;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  tab-size: 2;
  box-sizing: border-box;
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
  /* Make sure Prism styles are visible */
  color: rgba(0, 0, 0, 0.87) !important;
}

.v-mab-syntax-textarea:focus {
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}

.v-mab-syntax-textarea.text-error {
  border-color: #d32f2f;
}

.v-mab-syntax-textarea.text-error:focus {
  border-color: #d32f2f;
  box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.2);
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .v-mab-syntax-textarea {
    caret-color: rgba(255, 255, 255, 0.87);
    color: rgba(255, 255, 255, 0.87) !important;
  }

  .v-mab-syntax-textarea:focus {
    border-color: #90caf9;
    box-shadow: 0 0 0 2px rgba(144, 202, 249, 0.2);
  }

  .v-mab-syntax-textarea.text-error {
    border-color: #f48fb1;
  }

  .v-mab-syntax-textarea.text-error:focus {
    border-color: #f48fb1;
    box-shadow: 0 0 0 2px rgba(244, 143, 177, 0.2);
  }
}

/* Prism syntax highlighting styles - make sure they're applied to our contenteditable */
.v-mab-syntax-textarea .token.comment,
.v-mab-syntax-textarea .token.prolog,
.v-mab-syntax-textarea .token.doctype,
.v-mab-syntax-textarea .token.cdata {
  color: hsl(30, 20%, 50%);
}

.v-mab-syntax-textarea .token.punctuation {
  color: hsl(0, 0%, 50%);
}

.v-mab-syntax-textarea .token.property,
.v-mab-syntax-textarea .token.tag,
.v-mab-syntax-textarea .token.boolean,
.v-mab-syntax-textarea .token.number,
.v-mab-syntax-textarea .token.constant,
.v-mab-syntax-textarea .token.symbol,
.v-mab-syntax-textarea .token.deleted {
  color: hsl(220, 14%, 51%);
}

.v-mab-syntax-textarea .token.selector,
.v-mab-syntax-textarea .token.attr-name,
.v-mab-syntax-textarea .token.string,
.v-mab-syntax-textarea .token.char,
.v-mab-syntax-textarea .token.builtin,
.v-mab-syntax-textarea .token.inserted {
  color: hsl(119, 34%, 47%);
}

.v-mab-syntax-textarea .token.operator,
.v-mab-syntax-textarea .token.entity,
.v-mab-syntax-textarea .token.url,
.v-mab-syntax-textarea .token.variable {
  color: hsl(207, 82%, 66%);
}

.v-mab-syntax-textarea .token.atrule,
.v-mab-syntax-textarea .token.attr-value,
.v-mab-syntax-textarea .token.keyword {
  color: hsl(301, 63%, 40%);
}

.v-mab-syntax-textarea .token.function,
.v-mab-syntax-textarea .token.class-name {
  color: hsl(5, 74%, 59%);
}

.v-mab-syntax-textarea .token.regex,
.v-mab-syntax-textarea .token.important {
  color: #e90;
}

/* Ensure contenteditable cursor behavior */
.v-mab-syntax-textarea[contenteditable]:focus {
  caret-color: rgba(0, 0, 0, 0.87);
}

@media (prefers-color-scheme: dark) {
  .v-mab-syntax-textarea[contenteditable]:focus {
    caret-color: rgba(255, 255, 255, 0.87);
  }
}
</style>
