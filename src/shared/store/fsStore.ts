import { AUTOSAVE_DELAY } from '@/shared/config/constants'
import { getFS } from '@/shared/lib'
import type { TreeNode } from '@/shared/types/fs'
import { create } from 'zustand'
import { useUIStore } from './uiStore'

interface FSState {
	tree: TreeNode[]
	activeFile: string | null
	activeContent: string
	unsaved: boolean
	loading: boolean

	loadTree: () => Promise<void>
	openFile: (path: string) => Promise<void>
	saveFile: (path: string, content: string) => Promise<void>
	createFile: (path: string) => Promise<void>
	createDir: (path: string) => Promise<void>
	deleteFile: (path: string) => Promise<void>
	renameFile: (from: string, to: string) => Promise<void>
	setContent: (content: string) => void
}

let autosaveTimer: ReturnType<typeof setTimeout> | null = null

export const useFSStore = create<FSState>((set, get) => ({
	tree: [],
	activeFile: null,
	activeContent: '',
	unsaved: false,
	loading: false,

	loadTree: async () => {
		const fs = await getFS()
		const tree = await fs.listTree()
		set({ tree })
	},

	openFile: async path => {
		const fs = await getFS()
		set({ loading: true })
		try {
			const content = await fs.readFile(path)
			set({ activeFile: path, activeContent: content, unsaved: false })
			useUIStore.getState().setMobileView('editor')
		} finally {
			set({ loading: false })
		}
	},

	saveFile: async (path, content) => {
		const fs = await getFS()
		await fs.writeFile(path, content)
		set({ unsaved: false })
		await get().loadTree()
	},

	createFile: async path => {
		const fs = await getFS()
		const exists = await fs.exists(path)
		if (exists) throw new Error(`Файл уже существует: ${path}`)
		await fs.writeFile(path, '')
		await get().loadTree()
		await get().openFile(path)
	},

	createDir: async path => {
		const fs = await getFS()
		await fs.createDir(path)
		await get().loadTree()
	},

	deleteFile: async path => {
		const fs = await getFS()
		await fs.deleteFile(path)
		if (get().activeFile === path) {
			set({ activeFile: null, activeContent: '', unsaved: false })
		}
		await get().loadTree()
	},

	renameFile: async (from, to) => {
		const fs = await getFS()
		await fs.renameFile(from, to)
		if (get().activeFile === from) {
			set({ activeFile: to })
		}
		await get().loadTree()
	},

	setContent: content => {
		set({ activeContent: content, unsaved: true })

		if (autosaveTimer) clearTimeout(autosaveTimer)

		autosaveTimer = setTimeout(() => {
			const { activeFile, saveFile } = get()
			if (activeFile) saveFile(activeFile, content)
		}, AUTOSAVE_DELAY)
	}
}))
