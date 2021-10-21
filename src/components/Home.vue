<template>
  <a-row class="header" type="flex" align="center">
    <a-col :xs="{ span: 8, offset: 2 }" :sm="16" :md="12" :lg="{ span: 2, offset: 2 }">
            <span class="site_name">
                <router-link to="/">DeerBook</router-link>
            </span>
    </a-col>
    <a-col :xs="{ span: 10, offset: 2 }" :sm="16" :md="12" :lg="{ span: 4, offset: 14 }">
      <a-space class="action" algin="center" size="large">
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click.prevent>
            {{ username }}
            <DownOutlined/>
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <router-link to="/shelf">书架</router-link>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">个人资料</a>
              </a-menu-item>
              <a-menu-item>
                <a class="logout" @click="logout">登出</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-space>
    </a-col>
  </a-row>


  <a-row type="flex" justify="start" class="home">
    <a-col :xs="{ span: 20, offset: 2 }" :sm="16" :md="12" :lg="{ span: 16, offset: 4 }">
        <router-view></router-view>
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
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.replace({"path": "/login"})
    },
  },

}
</script>

<style>
.header {
  height: 64px;
  line-height: 64px;
  text-align: center;
}

.action {
  margin-right: 6px;
  font-size: 24px;
}

.site_name {
  font-size: 30px;
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