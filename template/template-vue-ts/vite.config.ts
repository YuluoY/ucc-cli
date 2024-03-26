import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import UnCompoent from 'unplugin-vue-components/vite'

// components路径
const COMPONENTS_PATH = fileURLToPath(new URL('./src/components', import.meta.url))
// src路径
const SRC_PATH = fileURLToPath(new URL('./src', import.meta.url))

// 导入全局样式文件，可以引入多个
const GLOBAL_STYLES = `
  @import "@/assets/styles/variables.scss";
`

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts',
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      eslintrc: {
        // 这里先设置成true然后npm run dev 运行之后会生成 .eslintrc-auto-import.json 文件之后，在改为false
        enabled: true,
        filepath: './.eslintrc-auto-import.json', // 生成的文件路径
        globalsPropValue: true
      }
    }),
    UnCompoent({
      dts: 'src/components.d.ts',
      dirs: [COMPONENTS_PATH]
    }),
    eslintPlugin({
      cache: false
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': SRC_PATH,
      components: COMPONENTS_PATH
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: GLOBAL_STYLES // 引入全局变量
      }
    }
  }
})
