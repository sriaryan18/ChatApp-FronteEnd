import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import veauryVitePlugins from 'veaury/vite/index.js'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      // react(),
    veauryVitePlugins({
      type: 'react',
    })

  ],
})
