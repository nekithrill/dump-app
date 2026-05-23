import { useUIStore } from '@/shared/store/uiStore'
import { EditorContent } from './components/editor-content'
import { EditorPreview } from './components/editor-preview'
import { EditorToolbar } from './components/editor-toolbar'
import styles from './Editor.module.scss'

export const Editor = () => {
	const editorMode = useUIStore(s => s.editorMode)

	return (
		<div className={styles['editor']}>
			<EditorToolbar />

			<div
				className={`${styles['editor__body']} ${styles[`editor__body--${editorMode}`]}`}
			>
				{(editorMode === 'editor' || editorMode === 'split') && (
					<EditorContent />
				)}

				{(editorMode === 'preview' || editorMode === 'split') && (
					<EditorPreview />
				)}
			</div>
		</div>
	)
}
