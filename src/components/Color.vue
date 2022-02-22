<template>
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
            <VueEternalLoading :load="load"></VueEternalLoading>
        </a-col>
    </a-row>
</template>




<script>
const PAGE_SIZE = 10;
import { VueEternalLoading } from '@ts-pro/vue-eternal-loading';
import http from '../axios';
export default {
    name: "colorlist",
    components: { VueEternalLoading },

    data() {
        return {
            list: []
        }
    },
    created() {
        // this.load();
    },
    methods: {
        // 5fe35a393848694a84bd5006

        // 616f7073db6d00004d001ab2
        async load(action) {
            var res = await http.get("/color/616f7073db6d00004d001ab2")
            this.list = this.list.concat(res.data)
            action.loaded(res.data.length, PAGE_SIZE);
        },
        watchAll(cid, name) {
            this.$router.push({
                name: "readcolor",
                params: {
                    cid: cid, name: name
                }
            })
        },
        getHeight() {
            let bodyHeight = document.documentElement.clientHeight;
            let scroller = this.$refs.scroller;
            let scrollerTop = scroller.getBoundingClientRect().top;
            scroller.style.height = (bodyHeight - scrollerTop) + "px";
        },

    },

}
</script>

<style>
</style>