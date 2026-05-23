export interface FileNode {
	name: string
	path: string
	type: 'file'
	mtime: number
}

export interface DirNode {
	name: string
	path: string
	type: 'dir'
	children: TreeNode[]
}

export type TreeNode = FileNode | DirNode
