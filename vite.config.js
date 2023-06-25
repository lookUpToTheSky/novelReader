import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import globalStyle from '@originjs/vite-plugin-global-style'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    globalStyle({
      sourcePath: './src/assets/less',
      lessEnabled: true
    }),
  ],
  resolve: {
    alias: {
      '@':path.resolve('./src')
    }
  }
})
