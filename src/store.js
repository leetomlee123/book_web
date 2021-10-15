import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
            count: 0,
            profile: '',
            collapse: false

        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        setProfile(state, v) {
            state.profile = v
        }
    }
})

export default store