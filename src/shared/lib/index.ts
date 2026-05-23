import type { IFileSystem } from './IFileSystem'
import { OPFSAdapter } from './OPFSAdapter'

let instance: IFileSystem | null = null

export async function getFS(): Promise<IFileSystem> {
	if (instance) return instance

	const adapter = new OPFSAdapter()
	await adapter.init()
	await adapter.persist()

	instance = adapter
	return instance
}
