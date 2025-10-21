import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cpSync, existsSync } from 'fs'
import { join } from 'path'
import type { Plugin } from 'vite'

// sampleAssets を dist にコピーするプラグイン
function copySampleAssets(): Plugin {
  return {
    name: 'copy-sample-assets',
    apply: 'build',
    writeBundle() {
      const sourceDir = join(process.cwd(), 'sampleAssets')
      const destDir = join(process.cwd(), 'dist', 'sampleAssets')

      if (existsSync(sourceDir)) {
        cpSync(sourceDir, destDir, { recursive: true, force: true })
        console.log('✓ sampleAssets を dist にコピーしました')
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copySampleAssets()],
  base: './',
})
