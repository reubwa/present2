import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import adapter from '@sveltejs/adapter-static';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      compilerOptions: {
        experimental: {
          async: true
        }
      },
      kit: {
        adapter: adapter({
          fallback: '404.html'
        }),
        paths: {
          base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
        },
        files: {
          assets: 'static'
        }
      }
    })
  ]
});
