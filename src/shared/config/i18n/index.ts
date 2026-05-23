import enTranslation from '@/shared/config/i18n/locales/en.json'
import ruTranslation from '@/shared/config/i18n/locales/ru.json'
import uaTranslation from '@/shared/config/i18n/locales/ua.json'
import { LANGUAGES, type Language } from '@/shared/config/locale'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources: Record<Language, { translation: object }> = {
	[LANGUAGES.EN.value]: { translation: enTranslation },
	[LANGUAGES.RU.value]: { translation: ruTranslation },
	[LANGUAGES.UA.value]: { translation: uaTranslation }
}

i18n.use(initReactI18next).init({
	resources,
	lng: LANGUAGES.EN.value,
	fallbackLng: LANGUAGES.EN.value,
	interpolation: {
		escapeValue: false
	}
})

export default i18n
