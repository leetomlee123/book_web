import { createRouter, createWebHashHistory } from 'vue-router'
import BookIndex from "./components/BookIndex.vue"
import Chapters from './components/Chapters.vue'
import Content from './components/Content.vue'
import Forget from './components/Forget.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Person from './components/Person.vue'
import Profile from './components/Profile.vue'
import Register from './components/Register.vue'

const routes = [
    { path: "/", redirect: '/home' },
    {
        path: "/home", component: Home,
        children: [
            {
                path: "/shelf", component: () => import('./components/Shelf.vue'), name: "shelf"
            },
            {
                path: "/chapters", component: Chapters, name: "Chapters"
            },

            {
                path: "", component: BookIndex, name: "BookIndex"
            },
            {
                name: 'content', path: "/content", component: Content
            },
            {
                path: '/person', component: Person, children: [

                    {
                        path: "pushNewVersion", component: () => import('./components/PushNewVersion.vue')
                    },

                    {
                        path: "profile", component: () => import('./components/Profile.vue')
                    }
                ]
            },
        ]
    },

    {
        path: "/login", component: Login, meta: {
            canNoToken: true
        }
    },
    {
        path: '/register', component: Register, meta: {
            canNoToken: true
        }
    },

    {
        path: '/forget', component: Forget, meta: {
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
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

// router.beforeEach((to, from, next) => {

//     //  matched的数组中包含$route对象的检查元字段
//     //  arr.some() 表示判断该数组是否有元素符合相应的条件, 返回布尔值
//     if (to.matched.some(record => record.meta.canNoToken)) {
//         // 判断当前是否有登录的权限

//         next()

//     } else {
//         var token = store.state.profile.token;
//         if (token != null && token != '' && token != undefined) {
//             next()
//         } else {
//             next({
//                 path: '/login'
//             })
//         }
//     }
// })
export default router