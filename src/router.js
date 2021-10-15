import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import JobList from './components/JobList.vue'
import store from './store'
const routes = [
    { path: "/", redirect: '/home' },
    {
        path: "/home", component: Home,
        children:[
            {
                path: "/JobList", component: JobList
            },
        ]
    },

    {
        path: "/login", component: Login, meta: {
            canNoToken: true
        }
    }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {

    //  matched的数组中包含$route对象的检查元字段
    //  arr.some() 表示判断该数组是否有元素符合相应的条件, 返回布尔值
    if (to.matched.some(record => record.meta.canNoToken)) {
        // 判断当前是否有登录的权限

        next()

    } else {
        var token = store.state.profile.token;
        if (token != null && token != '' && token != undefined) {
            next()
        } else {
            next({
                path: '/login'
            })
        }
    }
})
export default router