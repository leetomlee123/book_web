import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import createImportPlugin from 'vite-plugin-import'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createImportPlugin({
      onlyBuild: false,//是否只需要在生产环境中使用
      babelImportPluginOptions: [
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true, // or 'css'
        },
      ],
    }),
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
  },
  build: {
    chunkSizeWarningLimit:1500,
    rollupOptions: {
        output:{
            manualChunks(id) {
              if (id.includes('node_modules')) {
                
                  return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
          }
        }
    }
  }

})
