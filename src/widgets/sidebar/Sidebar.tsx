import { SidebarFooter } from './components/sidebar-footer'
import { SidebarHeader } from './components/sidebar-header'
import { SidebarTree } from './components/sidebar-tree'
import styles from './Sidebar.module.scss'

export const Sidebar = () => {
	return (
		<aside className={styles['sidebar']}>
			<SidebarHeader />
			<SidebarTree />
			<SidebarFooter />
		</aside>
	)
}
