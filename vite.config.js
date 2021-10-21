import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ], 
  // server: {
  //   port: '3000',
  //   open: false, //自动打开 
  //   base: "./ ", //生产环境路径
  //   proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
  //     // 正则表达式写法
  //     '^/api': {
  //       target: 'locahost', // 后端服务实际地址
  //       changeOrigin: true, //开启代理
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 此处也可设置直角、边框色、字体大小等
          'primary-color': '#956839'
        },
        javascriptEnabled: true
      }
    }
  }

})
