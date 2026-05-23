import type { TreeNode } from '@/shared/types/fs'

export interface IFileSystem {
	init(): Promise<void>
	readFile(path: string): Promise<string>
	writeFile(path: string, content: string): Promise<void>
	deleteFile(path: string): Promise<void>
	renameFile(from: string, to: string): Promise<void>
	createDir(path: string): Promise<void>
	listTree(path?: string): Promise<TreeNode[]>
	exists(path: string): Promise<boolean>
	persist(): Promise<boolean>
}
