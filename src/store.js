import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            count: 0,
            profile: {},
            collapse: false,
            shelf: [],
            bid: "",
            chapters: [],
            chapterIdx: 0,
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
        },
        set_shelf(state, v) {
            if (v == undefined || v == "" || v == null) {
                v = []
            }
            state.shelf = v
        },
        set_bid(state, v) { state.bid = v },
        set_chapterIdx(state, v) { state.chapterIdx = v },
        set_chapters(state, v) { state.chapters = v },
    },
    getters: {

        getChapter(state) {
            return state.chapters[state.chapterIdx]
        }
    }
})

export default store