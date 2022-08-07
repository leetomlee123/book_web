<template>
  <a-row class="r" justify="center">
    <a-col :xs="14" :sm="10" :md="10" :lg="10" :xl="8">
      <a-row justify="end">
        <a-col> <img :src="data.picUrl" style="height:200px;max-width: 100%; " /></a-col>
      </a-row>
    </a-col>
    <a-col class="left" :xs="22" :sm="10" :md="10" :lg="10" :xl="10">
      <a-space direction="vertical" size="large">
        <div> <span class="music-name">{{ data.name }}</span>
          <span class="music-auther">{{ data.auther }}</span>
        </div>
        <div class="content">{{ data.content }}</div>
        <div>
          <audio controls="controls" ref="au" @pause="onPause" @ended="next_music" >
          </audio>

        </div>

      </a-space>

    </a-col>



  </a-row>
  <a-row class="r" justify="center">
    <a-col :xs="10" :sm="3" :md="2" :lg="2" :xl="2">
      <a-radio v-model:checked="next">自动下一首</a-radio>
    </a-col>
    <a-col :xs="8" :sm="3" :md="2" :lg="2" :xl="1">
      <a-button type="primary" block @click="get_music">
        换一首
      </a-button>
    </a-col>
  </a-row>

</template>


<script>
import http from '../axios';
export default {
  name: "Home",
  components: {},
  setup(props) {
    return {}
  },
  mounted() {
    this.get_music();
  },
  data() {
    return {
      data: {},
      next: true
    }
  },
  methods: {
    get_ip() {
    },
    async get_music() {
      let res = await http.get("/api/reping")
      this.data = res
      this.$refs.au.src = res.mp3url
    },
    async next_music() {
      if (this.next) {
        await this.get_music();

      }
    }


  },

}
</script>

<style>
.music-name {
  font-size: x-large;
}



.audio {
  height: 30px;
}

.r {
  padding-top: 100px;

}

.left {
  padding-left: 20px;
}

.content {
  overflow: hidden;
}

@media (max-width: 480px) {
  .r {
    padding-top: 60px;
    text-align: center;

  }
}
</style>