import { useFSStore } from '@/shared/store/fsStore'
import { useEffect } from 'react'

export const useInitFS = () => {
	const loadTree = useFSStore(s => s.loadTree)

	useEffect(() => {
		loadTree()
	}, [loadTree])
}
