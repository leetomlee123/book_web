import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AntDesign from 'ant-design-vue'
import store from './store'

import 'ant-design-vue/dist/antd.less'

createApp(App).use(store).use(router).use(AntDesign).mount('#app')
