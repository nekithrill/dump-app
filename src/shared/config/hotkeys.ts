export const HOTKEYS = {
	NEW_FILE: 'mod+n',
	SEARCH: 'mod+p',
	TOGGLE_SIDEBAR: 'mod+`',
	TOGGLE_CHAT: 'mod+shift+enter',
	SAVE: 'mod+s',
	NAVIGATE_BACK: 'mod+[',
	NAVIGATE_FORWARD: 'mod+]',
	BOLD: 'mod+b',
	ITALIC: 'mod+i',
	CHECKBOX: 'mod+y'
} as const

export type Hotkey = (typeof HOTKEYS)[keyof typeof HOTKEYS]
