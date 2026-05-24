import { useNodeActions } from '@/shared/hooks/useNodeActions'
import { useFSStore } from '@/shared/store/fsStore'
import type { TreeNode as TreeNodeType } from '@/shared/types/fs'
import {
	ChevronDown,
	ChevronRight,
	File,
	FilePlus,
	Folder,
	FolderOpen,
	Pencil,
	Trash2
} from 'lucide-react'
import { useState } from 'react'
import styles from './TreeNode.module.scss'

interface TreeNodeProps {
	node: TreeNodeType
	depth?: number
}

export const TreeNode = ({ node, depth = 0 }: TreeNodeProps) => {
	const { handleCreateFile, handleRename, handleDelete } = useNodeActions(node)
	const [expanded, setExpanded] = useState(true)
	const [hovered, setHovered] = useState(false)

	const activeFile = useFSStore(s => s.activeFile)
	const openFile = useFSStore(s => s.openFile)
	const deleteFile = useFSStore(s => s.deleteFile)
	const renameFile = useFSStore(s => s.renameFile)

	const isActive = node.type === 'file' && node.path === activeFile

	if (node.type === 'dir') {
		return (
			<div className={styles['tree-node']}>
				<div
					className={styles['tree-node__row']}
					style={{ paddingLeft: `${depth * 12 + 8}px` }}
					onClick={() => setExpanded(prev => !prev)}
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
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

					{hovered && (
						<div className={styles['tree-node__actions']}>
							<button
								onClick={e => {
									e.stopPropagation()
									handleCreateFile()
								}}
							>
								<FilePlus size={16} />
							</button>
							<button
								onClick={e => {
									e.stopPropagation()
									handleRename()
								}}
							>
								<Pencil size={16} />
							</button>
							<button
								onClick={e => {
									e.stopPropagation()
									handleDelete()
								}}
							>
								<Trash2 size={16} />
							</button>
						</div>
					)}
				</div>

				{expanded &&
					node.children.map(child => (
						<TreeNode key={child.path} node={child} depth={depth + 1} />
					))}
			</div>
		)
	}

	return (
		<div
			className={`${styles['tree-node__row']} ${isActive ? styles['tree-node__row--active'] : ''}`}
			style={{ paddingLeft: `${depth * 12 + 8}px` }}
			onClick={() => openFile(node.path)}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<File size={16} className={styles['tree-node__file-icon']} />
			<span className={styles['tree-node__name']}>{node.name}</span>

			{hovered && (
				<div className={styles['tree-node__actions']}>
					<button
						onClick={e => {
							e.stopPropagation()
							handleRename()
						}}
					>
						<Pencil size={16} />
					</button>
					<button
						onClick={e => {
							e.stopPropagation()
							handleDelete()
						}}
					>
						<Trash2 size={16} />
					</button>
				</div>
			)}
		</div>
	)
}
