import type { TreeNode } from '@/shared/types/fs'
import type { IFileSystem } from './IFileSystem'

export class OPFSAdapter implements IFileSystem {
	private root: FileSystemDirectoryHandle | null = null

	async init(): Promise<void> {
		this.root = await navigator.storage.getDirectory()
	}

	private getRoot(): FileSystemDirectoryHandle {
		if (!this.root)
			throw new Error('OPFSAdapter не инициализирован. Вызови init() первым.')
		return this.root
	}

	private parsePath(path: string): { dirs: string[]; name: string } {
		const parts = path.split('/').filter(Boolean)
		return {
			dirs: parts.slice(0, -1),
			name: parts.at(-1) ?? path
		}
	}

	private async resolveDir(
		parts: string[],
		create = false
	): Promise<FileSystemDirectoryHandle> {
		let dir = this.getRoot()
		for (const part of parts) {
			dir = await dir.getDirectoryHandle(part, { create })
		}
		return dir
	}

	async readFile(path: string): Promise<string> {
		const { dirs, name } = this.parsePath(path)
		const dir = await this.resolveDir(dirs)
		const handle = await dir.getFileHandle(name)
		const file = await handle.getFile()
		return file.text()
	}

	async writeFile(path: string, content: string): Promise<void> {
		const { dirs, name } = this.parsePath(path)
		const dir = await this.resolveDir(dirs, true)
		const handle = await dir.getFileHandle(name, { create: true })
		const writable = await handle.createWritable()
		await writable.write(content)
		await writable.close()
	}

	async deleteFile(path: string): Promise<void> {
		const { dirs, name } = this.parsePath(path)
		const dir = await this.resolveDir(dirs)
		await dir.removeEntry(name, { recursive: true })
	}

	async renameFile(from: string, to: string): Promise<void> {
		await this.copyEntry(from, to)
		await this.deleteFile(from)
	}

	private async copyEntry(from: string, to: string): Promise<void> {
		const { dirs, name } = this.parsePath(from)
		const fromDir = await this.resolveDir(dirs)

		let isFile = false
		for await (const [entryName, handle] of fromDir.entries()) {
			if (entryName === name) {
				isFile = handle.kind === 'file'
				break
			}
		}

		if (isFile) {
			const fileHandle = await fromDir.getFileHandle(name)
			const file = await fileHandle.getFile()
			const content = await file.text()
			await this.writeFile(to, content)
		} else {
			const fromParts = from.split('/').filter(Boolean)
			const fromDirHandle = await this.resolveDir(fromParts)
			await this.copyDir(fromDirHandle, to)
		}
	}

	private async copyDir(
		dir: FileSystemDirectoryHandle,
		toPath: string
	): Promise<void> {
		await this.createDir(toPath)
		for await (const [name, handle] of dir.entries()) {
			const childPath = `${toPath}/${name}`
			if (handle.kind === 'directory') {
				await this.copyDir(handle as FileSystemDirectoryHandle, childPath)
			} else {
				const file = await (handle as FileSystemFileHandle).getFile()
				const content = await file.text()
				await this.writeFile(childPath, content)
			}
		}
	}

	async createDir(path: string): Promise<void> {
		const parts = path.split('/').filter(Boolean)
		await this.resolveDir(parts, true)
	}

	async exists(path: string): Promise<boolean> {
		try {
			const { dirs, name } = this.parsePath(path)
			const dir = await this.resolveDir(dirs)
			try {
				await dir.getFileHandle(name)
				return true
			} catch {
				await dir.getDirectoryHandle(name)
				return true
			}
		} catch {
			return false
		}
	}

	async listTree(path = ''): Promise<TreeNode[]> {
		const parts = path.split('/').filter(Boolean)
		const dir = parts.length > 0 ? await this.resolveDir(parts) : this.getRoot()
		return this.readDir(dir, path)
	}

	private async readDir(
		dir: FileSystemDirectoryHandle,
		basePath: string
	): Promise<TreeNode[]> {
		const nodes: TreeNode[] = []

		for await (const [name, handle] of dir.entries()) {
			if (name.startsWith('.')) continue

			const nodePath = basePath ? `${basePath}/${name}` : name

			if (handle.kind === 'directory') {
				const children = await this.readDir(
					handle as FileSystemDirectoryHandle,
					nodePath
				)
				nodes.push({ name, path: nodePath, type: 'dir', children })
			} else {
				if (!name.endsWith('.md')) continue
				const file = await (handle as FileSystemFileHandle).getFile()
				nodes.push({
					name,
					path: nodePath,
					type: 'file',
					mtime: file.lastModified
				})
			}
		}

		return nodes.sort((a, b) => {
			if (a.type !== b.type) return a.type === 'dir' ? -1 : 1
			return a.name.localeCompare(b.name)
		})
	}

	async persist(): Promise<boolean> {
		if (!navigator.storage?.persist) return false
		return navigator.storage.persist()
	}
}
