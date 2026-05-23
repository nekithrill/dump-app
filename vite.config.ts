import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	server: {
		port: Number(process.env.VITE_PORT) || 3000
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'md notes',
				short_name: 'notes',
				description: 'Local-first markdown notes',
				theme_color: '#0f0f0f',
				background_color: '#0f0f0f',
				display: 'standalone',
				icons: [
					{ src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
					{ src: 'icon-512.png', sizes: '512x512', type: 'image/png' }
				]
			}
		})
	],
	css: {
		preprocessorOptions: {
			scss: {
				loadPaths: [path.resolve(__dirname, './src')],
				additionalData: `
          @use "app/styles/core/functions" as *;
          @use "app/styles/core/mixins" as *;
        `
			}
		}
	}
})
