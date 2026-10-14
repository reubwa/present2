import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import adapter from '@sveltejs/adapter-static';
import path from 'path';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter({
				fallback: '404.html'
			}),
			paths: {
				base: process.argv.includes('dev')
					? ''
					: (process.env.BASE_PATH as `/${string}` | undefined)
			},
			files: {
				assets: 'static'
			}
		})
	],
	resolve: {
		alias: {
			'$lib': path.resolve('./src/lib')
		}
	}
});