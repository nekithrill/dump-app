import { useFSStore } from '@/shared/store/fsStore'
import {
	DndContext,
	PointerSensor,
	TouchSensor,
	useDroppable,
	useSensor,
	useSensors,
	type DragEndEvent
} from '@dnd-kit/core'
import { TreeNode } from '../tree-node'
import styles from './SidebarTree.module.scss'

const RootDropZone = ({ children }: { children: React.ReactNode }) => {
	const { setNodeRef, isOver } = useDroppable({ id: 'root' })
	return (
		<div
			ref={setNodeRef}
			className={`${styles['sidebar-tree']} ${isOver ? styles['sidebar-tree--over'] : ''}`}
		>
			{children}
		</div>
	)
}

export const SidebarTree = () => {
	const tree = useFSStore(s => s.tree)
	const renameFile = useFSStore(s => s.renameFile)

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

	if (tree.length === 0) {
		return (
			<div className={styles['sidebar-tree__empty']}>
				<span>Нет файлов</span>
			</div>
		)
	}

	return (
		<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
			<RootDropZone>
				{tree.map(node => (
					<TreeNode key={node.path} node={node} />
				))}
			</RootDropZone>
		</DndContext>
	)
}
