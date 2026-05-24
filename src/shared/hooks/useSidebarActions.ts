// shared/hooks/useSidebarActions.ts
import { validateName } from '@/shared/lib/validate'
import { useFSStore } from '@/shared/store/fsStore'

export const useSidebarActions = () => {
	const createFile = useFSStore(s => s.createFile)
	const createDir = useFSStore(s => s.createDir)

	const handleCreateFile = async () => {
		const name = prompt('Имя файла:')
		if (!name) return
		const result = validateName(name, 'file')
		if (!result.valid) {
			alert(result.error)
			return
		}
		await createFile(result.normalizedName!)
	}

	const handleCreateDir = async () => {
		const name = prompt('Имя папки:')
		if (!name) return
		const result = validateName(name, 'dir')
		if (!result.valid) {
			alert(result.error)
			return
		}
		await createDir(result.normalizedName!)
	}

	return { handleCreateFile, handleCreateDir }
}
