import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return  {
            count: 0,
            profile: {},
            collapse: false

        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        set_profile(state, v) {
            state.profile = v
        },
        logout(state) {
            state.profile = {}
        }
    }
})

export default store