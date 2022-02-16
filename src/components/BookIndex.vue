<template>
  <a-row type="flex" justify="center" :gutter="[5, 5]" class="searchInput">
    <a-col :xs="24" :sm="16" :md="12" :lg="8" :xl="{ span: 14, }">
      <a-input-search v-model:value="value" placeholder="搜索书名/作者" enter-button @search="onSearch" />
    </a-col>
    <a-col ref="target" :span="24" class="f"></a-col>
    <a-col
      :xs="8"
      :sm="2"
      :md="2"
      :lg="2"
      :xl="{ span: 2, }"
      v-for="(item, index) in cates"
      :key="index"
      style="text-align: center;"
    >
      <a @click="clickCate(item)">{{ item }}</a>
    </a-col>
  </a-row>

  <div class="bks" ref="bksT">
    <a-row type="flex" justify="start">
      <a-col
        :xs="12"
        :sm="16"
        :md="12"
        :lg="8"
        :xl="4"
        v-for="(item, index) in books"
        :key="item.Id"
        class="height-120"
        @click="chapters(item.Id == undefined ? item.id : item.Id)"
      >
        <div class="bks">
          <a-image
            :width="100"
            :src="item.Img == undefined ? item.cover : item.Img"
            :preview="false"
            fallback="data:image/png;base64,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"
          />
          <p class="author">
            {{ item.Name === undefined ? item.bookName : item.Name }}|
            <em>{{ item.Author == undefined ? item.author : item.Author }}</em>
          </p>
        </div>
      </a-col>
    </a-row>
    <a-pagination
      v-show="books.length > 0"
      :total="total"
      v-model:current="page"
      v-model:pageSize="size"
      @change="change"
    ></a-pagination>
  </div>
</template>

<script>import { message } from "ant-design-vue";
import http from "../axios";

export default {
  name: "BookIndex",
  components: {},
  setup(props) {

  },
  data() {
    return {
      //true 分类列表 false 搜索列表
      flag: true,
      cates: [],
      cate: '',
      page: 1,
      size: 18,
      books: [], value: '',
      total: 0

    }
  },
  created() {
    this.initCategorys()
  },
  watch: {
    page() {
      console.log(this.page)
    }
  },
  methods: {
    async initCategorys() {
      var res = await http.get("/book/category");
      this.cates = res.data.filter(item => item != "")
    },
    async fetchCateBooks() {

      let res = await http.get("/book/category/" + this.cate + "/" + this.page + "/" + this.size);
      let res1 = await http.get("/book/categories/" + this.cate)
      const data = res.data
      const data1 = res1.data
      if (data == null) {
        message.info("没有数据")
      } else {

        this.books = data
        this.total = data1

      }

    },
    async onSearch() {
      if (this.flag !== false) {
        this.page = 1
        this.flag = false
      }

      const res = await http.get("/book/searchV", {
        params: {
          "key": this.value,
          "page": this.page,
          "size": this.size
        }
      });
      const data = res.data
      if (data == null) {
        message.info("没有数据")
      }

      this.books = data.books
     
      this.total = data.pages

    },
    clickCate(cate) {
      if (this.flag !== true) {
        this.page = 1
        this.flag = true
      }
      if (this.cate !== cate) {
        this.page = 1
      }
      this.cate = cate;
      this.fetchCateBooks()
    },
    change() {
      this.goTop()
      if (this.flag) {
        this.fetchCateBooks()

      } else {
        this.onSearch()
      }
    },

    chapters(bid) {
      this.$store.commit("set_bid", bid);
      this.$router.push("chapters");
    },
    goTop() {
      this.$refs.bksT.scrollIntoView(true);
    },
  },
}
</script>

<style>
.bks {
  margin-top: 20px;
  text-align: center;
}
.f {
  padding-bottom: 40px;
}
</style>