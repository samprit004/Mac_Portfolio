import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: /^#components\/(.*)$/, replacement: `${path.resolve(rootDir, 'src/components')}/$1` },
      { find: /^#constants\/(.*)$/, replacement: `${path.resolve(rootDir, 'src/constants')}/$1` },
      { find: /^#store\/(.*)$/, replacement: `${path.resolve(rootDir, 'src/store')}/$1` },
      { find: /^#hoc\/(.*)$/, replacement: `${path.resolve(rootDir, 'src/hoc')}/$1` },
      { find: /^#windows\/(.*)$/, replacement: `${path.resolve(rootDir, 'src/windows')}/$1` },
      { find: /^#\/(.*)$/, replacement: `${path.resolve(rootDir, 'src')}/$1` },
    ],
  },
})
