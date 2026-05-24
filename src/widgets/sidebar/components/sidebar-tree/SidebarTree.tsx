import { useSidebarActions } from '@/shared/hooks/useSidebarActions'
import { useFSStore } from '@/shared/store/fsStore'
import { ContextMenu, type ContextMenuItem } from '@/shared/ui/context-menu'
import {
	DndContext,
	PointerSensor,
	TouchSensor,
	useDroppable,
	useSensor,
	useSensors,
	type DragEndEvent
} from '@dnd-kit/core'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { TreeNode } from '../tree-node'
import styles from './SidebarTree.module.scss'

const RootDropZone = ({
	children,
	onContextMenu
}: {
	children: React.ReactNode
	onContextMenu: (e: React.MouseEvent) => void
}) => {
	const { setNodeRef, isOver } = useDroppable({ id: 'root' })
	return (
		<div
			ref={setNodeRef}
			onContextMenu={onContextMenu}
			className={`${styles['sidebar-tree']} ${isOver ? styles['sidebar-tree--over'] : ''}`}
		>
			{children}
		</div>
	)
}

export const SidebarTree = () => {
	const tree = useFSStore(s => s.tree)
	const renameFile = useFSStore(s => s.renameFile)
	const { handleCreateFile, handleCreateDir } = useSidebarActions()

	const [contextMenu, setContextMenu] = useState<{
		x: number
		y: number
	} | null>(null)

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
		useSensor(TouchSensor, {
			activationConstraint: { delay: 250, tolerance: 5 }
		})
	)

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event
		if (!over || active.id === over.id) return

		const fromPath = active.id as string
		const toFolder = over.id as string

		const fileName = fromPath.split('/').at(-1)!
		const newPath = toFolder === 'root' ? fileName : `${toFolder}/${fileName}`

		if (fromPath !== newPath) {
			await renameFile(fromPath, newPath)
		}
	}

	const handleContextMenu = (e: React.MouseEvent) => {
		e.preventDefault()
		setContextMenu({ x: e.clientX, y: e.clientY })
	}

	const rootItems: ContextMenuItem[] = [
		{ label: 'New file', onClick: handleCreateFile },
		{ label: 'New folder', onClick: handleCreateDir }
	]

	if (tree.length === 0) {
		return (
			<>
				<div
					className={styles['sidebar-tree__empty']}
					onContextMenu={handleContextMenu}
				>
					<span>Нет файлов</span>
				</div>

				{contextMenu &&
					createPortal(
						<ContextMenu
							x={contextMenu.x}
							y={contextMenu.y}
							items={rootItems}
							onClose={() => setContextMenu(null)}
						/>,
						document.body
					)}
			</>
		)
	}

	return (
		<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
			<RootDropZone onContextMenu={handleContextMenu}>
				{tree.map(node => (
					<TreeNode key={node.path} node={node} />
				))}
			</RootDropZone>

			{contextMenu &&
				createPortal(
					<ContextMenu
						x={contextMenu.x}
						y={contextMenu.y}
						items={rootItems}
						onClose={() => setContextMenu(null)}
					/>,
					document.body
				)}
		</DndContext>
	)
}
