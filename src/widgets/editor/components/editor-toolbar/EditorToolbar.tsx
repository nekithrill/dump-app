import { useUIStore } from '@/shared/store/uiStore'
import { ArrowLeft, Columns2, Eye, Pencil } from 'lucide-react'
import styles from './EditorToolbar.module.scss'

export const EditorToolbar = () => {
	const editorMode = useUIStore(s => s.editorMode)
	const setEditorMode = useUIStore(s => s.setEditorMode)
	const setMobileView = useUIStore(s => s.setMobileView)

	return (
		<div className={styles['editor-toolbar']}>
			<button
				className={styles['editor-toolbar__back']}
				onClick={() => setMobileView('sidebar')}
				title='Назад'
			>
				<ArrowLeft size={20} />
			</button>

			<div className={styles['editor-toolbar__modes']}>
				<button
					className={`${styles['editor-toolbar__btn']} ${editorMode === 'editor' ? styles['editor-toolbar__btn--active'] : ''}`}
					onClick={() => setEditorMode('editor')}
					title='Редактор'
				>
					<Pencil size={20} />
				</button>

				<button
					className={`${styles['editor-toolbar__btn']} ${styles['editor-toolbar__btn--split']} ${editorMode === 'split' ? styles['editor-toolbar__btn--active'] : ''}`}
					onClick={() => setEditorMode('split')}
					title='Split'
				>
					<Columns2 size={20} />
				</button>

				<button
					className={`${styles['editor-toolbar__btn']} ${editorMode === 'preview' ? styles['editor-toolbar__btn--active'] : ''}`}
					onClick={() => setEditorMode('preview')}
					title='Превью'
				>
					<Eye size={20} />
				</button>
			</div>
		</div>
	)
}
