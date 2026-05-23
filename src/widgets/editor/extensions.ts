import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import {
	drawSelection,
	dropCursor,
	EditorView,
	highlightActiveLine,
	keymap
} from '@codemirror/view'

export const baseExtensions = () => [
	history(),
	drawSelection(),
	dropCursor(),
	highlightActiveLine(),
	markdown({
		base: markdownLanguage,
		codeLanguages: languages
	}),
	keymap.of([...defaultKeymap, ...historyKeymap]),
	EditorView.lineWrapping
]
