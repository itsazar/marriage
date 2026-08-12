import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // The album's optimized WebP output is regenerated wholesale by
      // `npm run album`. Watching hundreds of files while they're being
      // rewritten crashes the FSWatcher on Windows, so skip them.
      ignored: ['**/src/assets/album/**', '**/raw-photos/**'],
    },
  },
})
