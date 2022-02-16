<template>
  <a-row class="header" type="flex" align="start">
    <a-col :xs="{ span: 4, offset: 1 }"  :lg="{ span: 2, offset: 5 }">
      <span class="nav_1">
        <router-link to="/">Deer</router-link>
      </span>
    </a-col>

    <a-col :xs="{ span: 4,offset:14 }" :lg="{ span: 2, offset: 10 }">
      <span class="nav_2">
        <a-space class="action" algin="center" size="large">
          <a-dropdown :trigger="['click']">
            <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />

            <a class="ant-dropdown-link" @click.prevent>
              {{ username }}
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <router-link to="/shelf">书架</router-link>
                </a-menu-item>

                <a-menu-item>
                  <router-link to="/person">个人资料</router-link>
                </a-menu-item>
                <a-menu-item>
                  <a class="logout" @click="logout">登出</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-space>
      </span>
    </a-col>
  </a-row>

  <a-row type="flex" justify="start" class="home">
    <a-col :xs="{ span: 22, offset: 1 }" :sm="16" :md="12" :lg="{ span: 12, offset: 6 }">
      <keep-alive :include="cacheViews">
        <router-view></router-view>
      </keep-alive>
    </a-col>
  </a-row>

  <div class="bottom">
    <a-row class="header" type="flex" justify="space-around  " align="middle">
      <a-col>
        <span>DeerBook CopyRight 1999-2035</span>
      </a-col>
    </a-row>
  </div>
</template>


<script>
export default {
  name: "Home",
  components: {},
  setup(props) {
    return {}
  },
  data() {
    return {
      username: this.$store.state.profile.username,

      cacheViews: ['Index', "Shelf", "Chapters"]
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.replace({ "path": "/login" })
    },
  },

}
</script>

<style>
.header {
  height: 80px;
  line-height: 80px;
  text-align: center;
}

.action {
  margin-right: 6px;
  font-size: 24px;
}

.nav_1 {
  font-size: 48px;
  line-height: 80px;
}

.nav_2 {
  font-size: 25px;
  line-height: 80px;
}

.logout {
  font-weight: lighter;
  font-size: 16px !important;
}

.home {
  /*padding-left: 10%;*/
  /*padding-right: 10%;*/
  padding-top: 30px;
}

.bottom {
  padding-top: 50px;
}
</style>