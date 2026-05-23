import { useLanguageStore } from './localeStore'
import { useThemeStore } from './themeStore'

export const initStores = () => {
	const { theme } = useThemeStore.getState()
	const { language } = useLanguageStore.getState()

	useThemeStore.getState().setTheme(theme)
	useLanguageStore.getState().setLanguage(language)
}
