import { useFSStore } from '@/shared/store/fsStore'
import { TreeNode } from '../tree-node'
import styles from './SidebarTree.module.scss'

export const SidebarTree = () => {
	const tree = useFSStore(s => s.tree)

	if (tree.length === 0) {
		return (
			<div className={styles['sidebar-tree__empty']}>
				<span>Нет файлов</span>
			</div>
		)
	}

	return (
		<div className={styles['sidebar-tree']}>
			{tree.map(node => (
				<TreeNode key={node.path} node={node} />
			))}
		</div>
	)
}
