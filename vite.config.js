import { sveltekit } from '@sveltejs/kit/vite';
import { fileURLToPath, URL } from 'node:url'
/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
  alias: {
      'src': fileURLToPath(new URL('./src', import.meta.url)),
  }
};

export default config;
