import { useFileSystem } from '@/shared/hooks/useFileSystem'
import MarkdownIt from 'markdown-it'
import { useMemo } from 'react'
import styles from './EditorPreview.module.scss'

const md = new MarkdownIt({
	typographer: true,
	linkify: true,
	breaks: true
})

export const EditorPreview = () => {
	const { activeContent } = useFileSystem()

	const html = useMemo(() => md.render(activeContent), [activeContent])

	return (
		<div className={styles['editor-preview']}>
			<div
				className={styles['editor-preview__inner']}
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</div>
	)
}
