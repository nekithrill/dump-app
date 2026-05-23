import {
	DARK_THEME_VALUE,
	DATA_THEME_ATTR,
	LOCAL_STORAGE_THEME_KEY,
	type Theme
} from '@/shared/config/theme'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const getAppliedTheme = (
	theme: Theme,
	prefersDark: boolean
): 'light' | 'dark' => {
	if (theme === 'system') return prefersDark ? 'dark' : 'light'
	return theme
}

const applyThemeToDom = (theme: Theme, prefersDark: boolean) => {
	const root = document.documentElement
	const applied = getAppliedTheme(theme, prefersDark)
	if (applied === 'dark') {
		root.setAttribute(DATA_THEME_ATTR, DARK_THEME_VALUE)
	} else {
		root.removeAttribute(DATA_THEME_ATTR)
	}
}

interface ThemeState {
	theme: Theme
	prefersDark: boolean
	setTheme: (theme: Theme) => void
	toggleTheme: () => void
	setPrefersDark: (value: boolean) => void
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set, get) => ({
			theme: 'system',
			prefersDark: window.matchMedia('(prefers-color-scheme: dark)').matches,

			setTheme: theme => {
				set({ theme })
				applyThemeToDom(theme, get().prefersDark)
			},

			toggleTheme: () => {
				const themes: Theme[] = ['light', 'dark', 'system']
				const prev = get().theme
				const next =
					themes[(themes.indexOf(prev) + 1) % themes.length] ?? 'system'
				set({ theme: next })
				applyThemeToDom(next, get().prefersDark)
			},

			setPrefersDark: value => {
				set({ prefersDark: value })
				applyThemeToDom(get().theme, value)
			}
		}),
		{
			name: LOCAL_STORAGE_THEME_KEY,
			partialize: state => ({ theme: state.theme }),
			onRehydrateStorage: () => state => {
				if (!state) return
				applyThemeToDom(state.theme, state.prefersDark)
			}
		}
	)
)

window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', e =>
		useThemeStore.getState().setPrefersDark(e.matches)
	)
