import { App } from '@/app/App'
import '@/app/styles/main.scss'
import '@/shared/config/i18n'
import { initStores } from '@/shared/store/init'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

initStores()

const container = document.getElementById('root')
if (!container) throw new Error('Root container missing in index.html')

createRoot(container).render(
	<StrictMode>
		<App />
	</StrictMode>
)
