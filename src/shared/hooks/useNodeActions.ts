// shared/hooks/useNodeActions.ts
import { validateName } from '@/shared/lib/validate'
import { useFSStore } from '@/shared/store/fsStore'
import type { TreeNode } from '@/shared/types/fs'

export const useNodeActions = (node: TreeNode) => {
	const createFile = useFSStore(s => s.createFile)
	const deleteFile = useFSStore(s => s.deleteFile)
	const renameFile = useFSStore(s => s.renameFile)

	const handleCreateFile = async () => {
		const name = prompt('Имя файла:')
		if (!name) return
		const result = validateName(name, 'file')
		if (!result.valid) {
			alert(result.error)
			return
		}
		await createFile(`${node.path}/${result.normalizedName!}`)
	}

	const handleRename = async () => {
		const newName = prompt('Новое имя:', node.name)
		if (!newName || newName === node.name) return
		const result = validateName(newName, node.type)
		if (!result.valid) {
			alert(result.error)
			return
		}
		const dir = node.path.includes('/')
			? node.path.substring(0, node.path.lastIndexOf('/'))
			: ''
		const newPath = dir
			? `${dir}/${result.normalizedName!}`
			: result.normalizedName!
		await renameFile(node.path, newPath)
	}

	const handleDelete = async () => {
		if (!confirm(`Удалить "${node.name}"?`)) return
		await deleteFile(node.path)
	}

	return { handleCreateFile, handleRename, handleDelete }
}
