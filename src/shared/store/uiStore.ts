import { create } from 'zustand'

type MobileView = 'sidebar' | 'editor'

interface UIState {
	mobileView: MobileView
	setMobileView: (view: MobileView) => void
}

export const useUIStore = create<UIState>()(set => ({
	mobileView: 'sidebar',
	setMobileView: view => set({ mobileView: view })
}))
