import { getContext, setContext } from 'svelte';
import type { LexicalEditor } from 'lexical'

export function setEditorContext(editor: LexicalEditor) {
  setContext('Editor', editor)
}

export function getEditorContext(): LexicalEditor {
  return getContext('Editor')
}
