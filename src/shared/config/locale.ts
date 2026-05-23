export const LOCAL_STORAGE_LANGUAGE_KEY = 'language'

export const LANGUAGES = {
	EN: { value: 'en', label: 'EN' },
	UA: { value: 'uk', label: 'UA' },
	RU: { value: 'ru', label: 'RU' }
} as const

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES]['value']
