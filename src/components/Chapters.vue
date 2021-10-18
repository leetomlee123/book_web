<template>
    <div class="cps">
        <a-row type="flex" justify="center" align="middle" :gutter="[0, 10]">
            <a-col
                :xs="12"
                :sm="16"
                :md="12"
                :lg="8"
                :xl="6"
                v-for="(item, index) in chapters"
                :key="index"
                style="text-align: center;"
            >
                <a @click="goContent(index)">{{ item.name }}</a>
            </a-col>
        </a-row>
        <a-back-top />
    </div>
</template>

<script>
import http from "../axios";

export default {
    name: "Chapters",
    data() {
        return {
            chapters: []
        }
    },
    created() {
        this.initChapters()
    },
    methods: {
        async initChapters() {
            if (this.$store.state.chapters.length > 0) {
                this.chapters = this.$store.state.chapters;
            } else {
                var response = await http.get("/book/chapters/" + this.$store.state.bid + "/0");
                this.chapters = response.data;
                this.$store.commit("set_chapters", this.chapters)
            }

        },
        goContent(item) {
            console.log(this.key)
            this.$store.commit("set_chapterIdx", item)

            this.$router.push("/content")
        }
    },
}
</script>

<style>
.cp {
    margin-top: 10px;
    font-size: 15px;
    text-align: center;
    margin: 0 auto;
}
.cp:hover {
    background-color: antiquewhite;
}
</style>