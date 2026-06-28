import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

try {
  const logoSrc = 'C:\\Users\\ThinkPad\\.gemini\\antigravity-ide\\brain\\d3b513bd-f0db-4b42-8362-38d33f979fb0\\media__1782626403929.jpg';
  const logoDest = path.resolve(__dirname, 'public', 'logo.jpg');
  if (fs.existsSync(logoSrc)) {
    fs.copyFileSync(logoSrc, logoDest);
  }
} catch (e) {
  console.error("Failed to copy logo:", e);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
