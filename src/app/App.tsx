import { useInitFS } from '@/shared/hooks/useInitFS'
import { Sidebar } from '@/widgets/sidebar'
import styles from './App.module.scss'

export const App = () => {
	useInitFS()

	return (
		<div className={styles['app']}>
			<Sidebar />
		</div>
	)
}
