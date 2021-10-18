<template>
    <a-row type="flex" justify="center" :gutter="[0, 10]">
        <a-col :span="24">
            <h1 ref="title" style="text-align: center;padding-bottom:10px">{{ chapter['name'] }}</h1>
        </a-col>
        <a-col :xs="24" :sm="16" :md="12" :lg="8" :xl="{ span: 14, }">
            <a-row>
                <a-col :span="8" class="c">
                    <a @click="pre">上一章</a>
                </a-col>
                <a-col :span="8" class="c">
                    <router-link to="/chapters">目录</router-link>
                </a-col>
                <a-col :span="8" class="c">
                    <a @click="next">下一章</a>
                </a-col>
            </a-row>
        </a-col>
        <a-col
            :xs="24"
            :sm="16"
            :md="12"
            :lg="8"
            :xl="{ span: 14, }"
            v-for="(item, index) in content"
            :key="index"
        >
            <span class="paragraph">{{ item }}</span>
        </a-col>
        <a-col :xs="24" :sm="16" :md="12" :lg="8" :xl="{ span: 14, }" style="padding-top:10px">
            <a-row>
                <a-col :span="8" class="c">
                    <a @click="pre">上一章</a>
                </a-col>
                <a-col :span="8" class="c">
                    <router-link to="/chapters">目录</router-link>
                </a-col>
                <a-col :span="8" class="c">
                    <a @click="next">下一章</a>
                </a-col>
            </a-row>
        </a-col>
        <a-back-top ref="goTop" />
    </a-row>
</template>

<script>
import { message } from 'ant-design-vue';
import http from '../axios';
export default {
    name: "Content",
    setup(props) {

    },
    data() {
        return {
            chapter: {},
            idx: this.$store.state.chapterIdx,
            content: []
        }
    },
    computed: {
        chaptersLen() {
            return this.$store.state.chapters.length;
        }
    },
    created() {
        this.getChapter()
        this.fetchContent()
    },
    watch: {
        idx() {
            this.getChapter()
            this.fetchContent()
            this.goTop()
        },
    },
    methods: {
        async fetchContent() {
            var res = await http.get("/book/chapter/" + this.chapter['id'])
            this.content = res.data['content'].split('\n')

        },
        getChapter() {
            console.log(this.idx)
            this.chapter = this.$store.state.chapters[this.idx]

        },
        pre() {
            if (this.idx == 0) {
                message.info("已经是第一章")
                return
            }
            this.idx--;


        },
        next() {
            if (this.idx == this.chaptersLen - 1) {
                message.info("已经是最后一章")
                return
            }
            this.idx++;


        },
        goTop() {
            this.$refs.title.scrollIntoView(true);
        },
    },

}

</script>

<style>
.paragraph {
    font-size: 18px;
    font-family: Georgia, "Times New Roman", Times, serif;
    padding-left: 2em;
}
.c {
    text-align: center;
}
</style>