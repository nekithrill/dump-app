import { useEffect, useRef } from 'react'
import styles from './ContextMenu.module.scss'

export interface ContextMenuItem {
	label: string
	onClick: () => void
	danger?: boolean
	divider?: boolean
}

interface ContextMenuProps {
	x: number
	y: number
	items: ContextMenuItem[]
	onClose: () => void
}

export const ContextMenu = ({ x, y, items, onClose }: ContextMenuProps) => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onClose()
			}
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}

		document.addEventListener('mousedown', handleClick)
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('mousedown', handleClick)
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [onClose])

	useEffect(() => {
		if (!ref.current) return
		const rect = ref.current.getBoundingClientRect()
		const { innerWidth, innerHeight } = window

		if (rect.right > innerWidth) {
			ref.current.style.left = `${x - rect.width}px`
		}
		if (rect.bottom > innerHeight) {
			ref.current.style.top = `${y - rect.height}px`
		}
	}, [x, y])

	return (
		<div
			ref={ref}
			className={styles['context-menu']}
			style={{ top: y, left: x }}
		>
			{items.map((item, index) =>
				item.divider ? (
					<div key={index} className={styles['context-menu__divider']} />
				) : (
					<button
						key={index}
						className={`${styles['context-menu__item']} ${item.danger ? styles['context-menu__item--danger'] : ''}`}
						onClick={() => {
							item.onClick()
							onClose()
						}}
					>
						{item.label}
					</button>
				)
			)}
		</div>
	)
}
