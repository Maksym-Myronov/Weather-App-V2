import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			assets: '/src/assets',
			core: '/src/core',
			hooks: '/src/hooks',
			pages: '/src/pages',
			routes: '/src/routes',
			styles: '/src/styles',
			store: '/src/store',
			i18n: '/src/i18n',
			Layout: '/src/Layout'
		}
	}
});
