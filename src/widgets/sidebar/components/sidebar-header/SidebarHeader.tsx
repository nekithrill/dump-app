import { useFileSystem } from '@/shared/hooks/useFileSystem'
import {
	FileInput,
	FilePlus,
	FolderOpen,
	FolderPlus,
	Search
} from 'lucide-react'
import styles from './SidebarHeader.module.scss'

export const SidebarHeader = () => {
	const { createFile, createDir } = useFileSystem()

	const handleCreateFile = async () => {
		const name = prompt('Имя файла:')
		if (!name) return
		const path = name.endsWith('.md') ? name : `${name}.md`
		await createFile(path)
	}

	const handleCreateDir = async () => {
		const name = prompt('Имя папки:')
		if (!name) return
		await createDir(name)
	}

	return (
		<div className={styles['sidebar-header']}>
			<div className={styles['sidebar-header__actions']}>
				<button
					className={styles['sidebar-header__btn']}
					title='Поиск'
					disabled
				>
					<Search size={16} />
				</button>

				<button
					className={styles['sidebar-header__btn']}
					onClick={handleCreateFile}
					title='Новый файл'
				>
					<FilePlus size={16} />
				</button>

				<button
					className={styles['sidebar-header__btn']}
					onClick={handleCreateDir}
					title='Новая папка'
				>
					<FolderPlus size={16} />
				</button>

				<button
					className={styles['sidebar-header__btn']}
					disabled
					title='Открыть файл (скоро)'
				>
					<FileInput size={16} />
				</button>

				<button
					className={styles['sidebar-header__btn']}
					disabled
					title='Открыть папку (скоро)'
				>
					<FolderOpen size={16} />
				</button>
			</div>
		</div>
	)
}
