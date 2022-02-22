<template>
    <a-row type="flex" justify="center">
        <a-col :xs="24" :sm="16" :md="12" :lg="8" :xl="{ span: 24, }">
            <!-- <a-space direction="vertical " size="middle"> -->
            <h1 ref="title" style="text-align: center;padding-bottom:20px;padding-top:20px;">{{ name }}</h1>
        </a-col>
    </a-row>
    <a-row justify="center">
        <a-col
            :xs="{ span: 22, }"
            :lg="{ span: 10, offset: 6 }"
            v-for="(item, index) in content"
            :key="index"
        >
            <span class="paragraph">{{ item }}</span>
        </a-col>
    </a-row>
</template>

<script>
import http from '../axios';

export default {
    name: "readcolor",
    setup() {

    },
    data() {
        return {
            cid: this.$route.params.cid,
            name: this.$route.params.name,
            content: [],
        }
    },
    computed: {

    },
    created() {
        this.fetchContent()

    },
    methods: {
        async fetchContent() {
            this.content = []
            var res = await http.get("/book/chapter/" + this.cid)
            var content = res.data['content']

            this.content = content.split('\n')
        },


    },

}

</script>

<style>
.paragraph {
    font-size: 17px;
    font-family: Georgia, "Times New Roman", Times, serif;
    text-indent: 2em;
    text-align: center;
}
</style>