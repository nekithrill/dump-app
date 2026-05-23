import { create } from 'zustand'

type MobileView = 'sidebar' | 'editor'
type EditorMode = 'editor' | 'preview' | 'split'

interface UIState {
	mobileView: MobileView
	editorMode: EditorMode

	setMobileView: (view: MobileView) => void
	setEditorMode: (mode: EditorMode) => void
}

export const useUIStore = create<UIState>()(set => ({
	mobileView: 'sidebar',
	editorMode: 'editor',

	setMobileView: view => set({ mobileView: view }),
	setEditorMode: mode => set({ editorMode: mode })
}))
