import {
	LANGUAGES,
	LOCAL_STORAGE_LANGUAGE_KEY,
	type Language
} from '@/shared/config/locale'
import i18n from 'i18next'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const applyLanguage = (language: Language) => {
	i18n
		.changeLanguage(language)
		.catch(err => console.error('Failed to change language:', err))
	document.documentElement.lang = language
}

interface LanguageState {
	language: Language
	setLanguage: (language: Language) => void
	toggleLanguage: () => void
}

export const useLanguageStore = create<LanguageState>()(
	persist(
		(set, get) => ({
			language: LANGUAGES.EN.value,

			setLanguage: language => {
				set({ language })
				applyLanguage(language)
			},

			toggleLanguage: () => {
				const langs = Object.values(LANGUAGES).map(l => l.value) as Language[]
				const prev = get().language
				const next =
					langs[(langs.indexOf(prev) + 1) % langs.length] ?? LANGUAGES.EN.value
				get().setLanguage(next)
			}
		}),
		{
			name: LOCAL_STORAGE_LANGUAGE_KEY,
			partialize: state => ({ language: state.language }),
			onRehydrateStorage: () => state => {
				if (!state) return
				if (i18n.isInitialized) {
					applyLanguage(state.language)
				} else {
					i18n.on('initialized', () => applyLanguage(state.language))
				}
			}
		}
	)
)
