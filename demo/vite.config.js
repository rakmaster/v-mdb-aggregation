import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/v-mdb-aggregation/',
  build: {
    outDir: '../docs'
  }
})
