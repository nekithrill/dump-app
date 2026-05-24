import { useSidebarActions } from '@/shared/hooks/useSidebarActions'
import {
	FileInput,
	FilePlus,
	FolderOpen,
	FolderPlus,
	Search
} from 'lucide-react'
import styles from './SidebarHeader.module.scss'

export const SidebarHeader = () => {
	const { handleCreateFile, handleCreateDir } = useSidebarActions()

	return (
		<div className={styles['sidebar-header']}>
			<div className={styles['sidebar-header__actions']}>
				<button
					className={styles['sidebar-header__btn']}
					title='Поиск'
					disabled
				>
					<Search size={24} />
				</button>

				<button
					className={styles['sidebar-header__btn']}
					onClick={handleCreateFile}
					title='Новый файл'
				>
					<FilePlus size={24} />
				</button>

				<button
					className={styles['sidebar-header__btn']}
					onClick={handleCreateDir}
					title='Новая папка'
				>
					<FolderPlus size={24} />
				</button>

				<button
					className={styles['sidebar-header__btn']}
					disabled
					title='Открыть файл (скоро)'
				>
					<FileInput size={24} />
				</button>

				<button
					className={styles['sidebar-header__btn']}
					disabled
					title='Открыть папку (скоро)'
				>
					<FolderOpen size={24} />
				</button>
			</div>
		</div>
	)
}
