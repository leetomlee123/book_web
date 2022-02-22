import AntDesign from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueEternalLoading } from '@ts-pro/vue-eternal-loading';
createApp(App).use(VueEternalLoading).use(store).use(router).use(AntDesign).mount('#app')
