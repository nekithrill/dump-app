import { useFSStore } from '@/shared/store/fsStore'

export const useFileSystem = () => {
	const tree = useFSStore(s => s.tree)
	const activeFile = useFSStore(s => s.activeFile)
	const activeContent = useFSStore(s => s.activeContent)
	const unsaved = useFSStore(s => s.unsaved)
	const loading = useFSStore(s => s.loading)

	const openFile = useFSStore(s => s.openFile)
	const createFile = useFSStore(s => s.createFile)
	const createDir = useFSStore(s => s.createDir)
	const deleteFile = useFSStore(s => s.deleteFile)
	const renameFile = useFSStore(s => s.renameFile)
	const setContent = useFSStore(s => s.setContent)

	return {
		tree,
		activeFile,
		activeContent,
		unsaved,
		loading,
		openFile,
		createFile,
		createDir,
		deleteFile,
		renameFile,
		setContent
	}
}
