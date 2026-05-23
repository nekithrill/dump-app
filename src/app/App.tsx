import { useInitFS } from '@/shared/hooks/useInitFS'
import { useUIStore } from '@/shared/store/uiStore'
import { Editor } from '@/widgets/editor'
import { Sidebar } from '@/widgets/sidebar'
import styles from './App.module.scss'

export const App = () => {
	useInitFS()

	const mobileView = useUIStore(s => s.mobileView)

	return (
		<div className={`${styles['app']} ${styles[`app--${mobileView}`]}`}>
			<Sidebar />
			<Editor />
		</div>
	)
}
