import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://<user>.github.io/mock-ehr-ai-coach/ on GitHub Pages.
// In dev/preview the base resolves to '/'.
const base = process.env.GITHUB_ACTIONS ? '/mock-ehr-ai-coach/' : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
