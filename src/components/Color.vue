<template>
    <div ref="a">
        <a-row>
            <a-col :xs="{ span: 22, offset: 1 }" :lg="{ span: 10, offset: 6 }">
                <div v-for="item in list">
                    <h2 style="font-weight: 500;">{{ item.title }}</h2>

                    <p style="text-indent:2em;" class="c1">
                        {{ item.content }}
                        <a
                            @click="watchAll(item.id, item.title)"
                            align="right"
                        >...阅读更多</a>
                    </p>
                    <a-divider />
                </div>
            </a-col>
        </a-row>
    </div>
</template>




<script>
import http from '../axios';
import { getScrollHeight, getScrollTop, getWindowHeight } from "../utils/screen";
export default {
    name: "colorlist",
    data() {
        return {
            list: []
        }
    },
    created() {
        this.loadMore()
        // this.load();
    },
    methods: {
        // 5fe35a393848694a84bd5006

        // 616f7073db6d00004d001ab2
        async loadMore() {

            var res = await http.get("/color/616f7073db6d00004d001ab2")
            this.list = this.list.concat(res.data)
        },
        watchAll(cid, name) {
            this.$router.push({
                name: "readcolor",
                params: {
                    cid: cid, name: name
                }
            })
        },
        //无限滚动加载
        load() {
            var scrollTop = this.$refs.a.scrollTop;
            console.log(scrollTop)
            if (getScrollTop() + getWindowHeight() >= getScrollHeight()) {
                this.loadMore();
            }
        },

    },
    mounted() {
        this.box = this.$refs.a

        window.addEventListener('scroll', this.load, true)
        // this.box.addEventListener('scroll', this.load, true)

    },
    destroyed() {
        this.box = this.$refs.a
        window.removeEventListener('scroll', this.load, false);
        // this.box.removeEventListener('scroll', this.load, false);
    },
}
</script>

<style>
</style>