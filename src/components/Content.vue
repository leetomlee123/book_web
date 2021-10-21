<template>
  <a-row type="flex" justify="center" :gutter="[0, 10]" v-if="content.length === 0">
    <a-spin :indicator="indicator" :delay="500"/>
  </a-row>

  <a-row type="flex" justify="center" :gutter="[20, 10]" v-if="content.length > 0">
    <a-col :xs="24" :sm="16" :md="12" :lg="8" :xl="{ span: 14, }" class="content">
      <a-space direction="vertical " size="middle">
      <h1 ref="title" style="text-align: center;padding-bottom:20px">{{ chapter['name'] }}</h1>
      <a-row  >
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
      <a-row  :gutter="[10, 10]" justify="center">
      <a-col
          :xs="{span:22}" :sm="16" :md="12" :lg="8" :xl="{ span: 22 }"
          v-for="(item, index) in content"
          :key="index"
      >
        <span class="paragraph">{{ item }}</span>
      </a-col >
        </a-row>
      <div style="padding-top:10px">
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
      </div>
      <a-back-top ref="goTop"/>
      </a-space>

    </a-col>
  </a-row>
</template>

<script>
import {LoadingOutlined} from '@ant-design/icons-vue';
import {message} from 'ant-design-vue';
import {h} from 'vue';
import http, {http2 as f} from '../axios';

export default {
  name: "Content",
  setup() {
    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: '24px',
      },
      spin: true,
    });
    return {
      indicator,
    };
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
      this.content = []
      var res = await http.get("/book/chapter/" + this.chapter['id'])
      var content = res.data['content']
      var link = res.data['link']
      if (content == "请更新APP到最新版本.....酷安 DEMOONE 或者 QQ群 953457248" || content == "" || content == null) {

        res = await f.post("parseHtml", {
          "link": link,
          "id": this.chapter['id']
        })
        content = res.data['data']

      }
      this.content = content.split('\n')
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
  font-size: 22px;
  font-family: Georgia, "Times New Roman", Times, serif;
  padding-left: 2em;
  line-height: 2;
}

.c {
  text-align: center;
}

.content {
  background: #f5f5f5;

}

</style>