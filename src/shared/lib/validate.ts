// shared/lib/validate.ts

const INVALID_CHARS = /[<>:"/\\|?*\x00-\x1f]/
const RESERVED_NAMES = /^(con|prn|aux|nul|com\d|lpt\d)$/i

export interface ValidationResult {
	valid: boolean
	error?: string
	normalizedName?: string
}

export const validateName = (
	name: string,
	type: 'file' | 'dir'
): ValidationResult => {
	const normalized = name.trim().replace(/\s+/g, '-')

	if (!normalized) {
		return { valid: false, error: 'Name cannot be empty' }
	}

	if (normalized.startsWith('.')) {
		return { valid: false, error: 'Name cannot start with a dot' }
	}

	if (INVALID_CHARS.test(normalized)) {
		return { valid: false, error: 'Invalid characters: < > : " / \\ | ? *' }
	}

	if (RESERVED_NAMES.test(normalized)) {
		return { valid: false, error: 'Reserved name' }
	}

	if (normalized.length > 255) {
		return { valid: false, error: 'Name is too long' }
	}

	const finalName =
		type === 'file' && !normalized.endsWith('.md')
			? `${normalized}.md`
			: normalized

	return { valid: true, normalizedName: finalName }
}
