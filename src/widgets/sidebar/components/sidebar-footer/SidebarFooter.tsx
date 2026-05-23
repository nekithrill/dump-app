import { Settings } from 'lucide-react'
import styles from './SidebarFooter.module.scss'

export const SidebarFooter = () => {
	return (
		<div className={styles['sidebar-footer']}>
			<button
				className={styles['sidebar-footer__btn']}
				title='Настройки'
				onClick={() => {}}
			>
				<Settings size={16} />
			</button>
		</div>
	)
}
