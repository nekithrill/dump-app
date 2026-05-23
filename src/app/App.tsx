import { useInitFS } from '@/shared/hooks/useInitFS'
import styles from './App.module.scss'

export const App = () => {
	useInitFS()

	return <div className={styles['app']}>App</div>
}
