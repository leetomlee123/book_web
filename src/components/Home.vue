

<template>
    <a-row class="header">
        <a-col :offset="1" :span="2">
            <span class="site_name">DeerBook</span>
        </a-col>
        <a-col :span="2" :offset="18">
            <a-space class="action" algin="center" size="large">
                <span>{{ username }}</span>
                <span>登出</span>
            </a-space>
        </a-col>
    </a-row>
</template>


<script>
import { LogoutOutlined } from "@ant-design/icons-vue"
import http from "../axios"
export default {
    name: "Home",
    components: {
        LogoutOutlined
    },
    setup(props) {
        return {

        }
    },
    data() {
        return {
            username: this.$store.state.profile.username
        }
    },
    created() {
        this.getShelf()
    },
    methods: {
        async getShelf() {
            var response = await http.get("/book/shelf");
            console.log(response)
        }
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
</style>