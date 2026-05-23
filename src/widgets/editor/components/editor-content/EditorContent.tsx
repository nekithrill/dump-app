import { useFileSystem } from '@/shared/hooks/useFileSystem'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { useEffect, useRef } from 'react'
import { baseExtensions } from '../../extensions'
import styles from './EditorContent.module.scss'

export const EditorContent = () => {
	const editorRef = useRef<HTMLDivElement>(null)
	const viewRef = useRef<EditorView | null>(null)

	const { activeContent, setContent } = useFileSystem()

	useEffect(() => {
		if (!editorRef.current) return

		const view = new EditorView({
			state: EditorState.create({
				doc: activeContent,
				extensions: [
					...baseExtensions(),
					EditorView.updateListener.of(update => {
						if (update.docChanged) {
							setContent(update.state.doc.toString())
						}
					})
				]
			}),
			parent: editorRef.current
		})

		viewRef.current = view

		return () => {
			view.destroy()
			viewRef.current = null
		}
	}, [])

	useEffect(() => {
		const view = viewRef.current
		if (!view) return

		const current = view.state.doc.toString()
		if (current === activeContent) return

		view.dispatch({
			changes: {
				from: 0,
				to: current.length,
				insert: activeContent
			}
		})
	}, [activeContent])

	return (
		<div className={styles['editor-content']}>
			<div className={styles['editor-content__inner']}>
				<div ref={editorRef} className={styles['editor-content__cm']} />
			</div>
		</div>
	)
}
