import { useNodeActions } from '@/shared/hooks/useNodeActions'
import { useFSStore } from '@/shared/store/fsStore'
import type { TreeNode as TreeNodeType } from '@/shared/types/fs'
import { ContextMenu, type ContextMenuItem } from '@/shared/ui/context-menu'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import {
	ChevronDown,
	ChevronRight,
	File,
	Folder,
	FolderOpen
} from 'lucide-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './TreeNode.module.scss'

interface TreeNodeProps {
	node: TreeNodeType
	depth?: number
}

export const TreeNode = ({ node, depth = 0 }: TreeNodeProps) => {
	const { handleCreateFile, handleCreateDir, handleRename, handleDelete } =
		useNodeActions(node)
	const [expanded, setExpanded] = useState(true)
	const [contextMenu, setContextMenu] = useState<{
		x: number
		y: number
	} | null>(null)

	const activeFile = useFSStore(s => s.activeFile)
	const openFile = useFSStore(s => s.openFile)
	const isActive = node.type === 'file' && node.path === activeFile

	const {
		attributes,
		listeners,
		setNodeRef: setDragRef,
		isDragging
	} = useDraggable({ id: node.path })

	const { setNodeRef: setDropRef, isOver } = useDroppable({
		id: node.path,
		disabled: node.type === 'file'
	})

	const handleContextMenu = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setContextMenu({ x: e.clientX, y: e.clientY })
	}

	const dirItems: ContextMenuItem[] = [
		{ label: 'New file', onClick: handleCreateFile },
		{ label: 'New folder', onClick: handleCreateDir },
		{ divider: true, label: '', onClick: () => {} },
		{ label: 'Rename', onClick: handleRename },
		{ divider: true, label: '', onClick: () => {} },
		{ label: 'Delete', onClick: handleDelete, danger: true }
	]

	const fileItems: ContextMenuItem[] = [
		{ label: 'Rename', onClick: handleRename },
		{ divider: true, label: '', onClick: () => {} },
		{ label: 'Delete', onClick: handleDelete, danger: true }
	]

	if (node.type === 'dir') {
		return (
			<div
				ref={node => {
					setDragRef(node)
					setDropRef(node)
				}}
				className={`${styles['tree-node']} ${isOver ? styles['tree-node--over'] : ''}`}
				style={{ opacity: isDragging ? 0.5 : 1 }}
			>
				<div
					className={styles['tree-node__row']}
					style={{ paddingLeft: `${depth * 12 + 8}px` }}
					onClick={() => setExpanded(prev => !prev)}
					onContextMenu={handleContextMenu}
					{...attributes}
					{...listeners}
				>
					<span className={styles['tree-node__icon']}>
						{expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
					</span>

					{expanded ? (
						<FolderOpen
							size={16}
							className={styles['tree-node__folder-icon']}
						/>
					) : (
						<Folder size={16} className={styles['tree-node__folder-icon']} />
					)}

					<span className={styles['tree-node__name']}>{node.name}</span>
				</div>

				{expanded &&
					node.children.map(child => (
						<TreeNode key={child.path} node={child} depth={depth + 1} />
					))}

				{contextMenu &&
					createPortal(
						<ContextMenu
							x={contextMenu.x}
							y={contextMenu.y}
							items={dirItems}
							onClose={() => setContextMenu(null)}
						/>,
						document.body
					)}
			</div>
		)
	}

	return (
		<>
			<div
				ref={setDragRef}
				className={`${styles['tree-node__row']} ${isActive ? styles['tree-node__row--active'] : ''}`}
				style={{
					paddingLeft: `${depth * 12 + 8}px`,
					opacity: isDragging ? 0.5 : 1
				}}
				onClick={() => openFile(node.path)}
				onContextMenu={handleContextMenu}
				{...attributes}
				{...listeners}
			>
				<File size={16} className={styles['tree-node__file-icon']} />
				<span className={styles['tree-node__name']}>{node.name}</span>
			</div>

			{contextMenu &&
				createPortal(
					<ContextMenu
						x={contextMenu.x}
						y={contextMenu.y}
						items={fileItems}
						onClose={() => setContextMenu(null)}
					/>,
					document.body
				)}
		</>
	)
}
