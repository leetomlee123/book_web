<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
 <!-- vue3.0配置 -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"  v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <component :is="Component"  v-if="!$route.meta.keepAlive"/>
  </router-view>
</template>
<script>
export default {
  name: 'App',
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({},
          this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  },
}
</script>
<style>
/*a:active {*/
/*  color: #fff ;*/
/*  text-decoration: none;*/
/*  background: #f93;*/
/*}*/

/*a {*/
/*  color: #956839 ;*/
/*  background-color: transparent;*/
/*  text-decoration: none;*/
/*}*/



/*a:link {*/
/*  color: #956839;*/
/*  text-decoration: none;*/
/*}*/
</style>
