<template>
  <div class="login">
    <a-row type="flex" justify="center" :gutter="[0, 0]">
      <a-col :xs="{ span: 20 }" :sm="16" :md="12" :lg="8" :xl="{ span: 8 }" class="main">
        <h1>{{ title }}</h1>
        <a-form :model="formState" @finish="handleFinish" @finishFailed="handleFinishFailed" class>
          <a-form-item label="账户">
            <a-input v-model:value="formState.user" placeholder="account">
              <template #prefix>
                <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item label="密码">
            <a-input v-model:value="formState.password" type="password" placeholder="password">
              <template #prefix>
                <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input>
          </a-form-item>
          <center>
            <a-form-item class="loginBtn">
              <a-button
                type="primary"
                html-type="submit"
                :disabled="formState.user === '' || formState.password === ''"
                @click="login"
              >登录</a-button>
            </a-form-item>
          </center>
        </a-form>

        <a-space size="large">
          <router-link to="/forget">忘记密码</router-link>
          <router-link to="/register">注册账号</router-link>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>


<script>
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue';
import { reactive } from 'vue';
import http from './../axios';

export default {
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const formState = reactive({
      user: '',
      password: '',
    });

    const handleFinish = values => {
      console.log(values, formState);
    };

    const handleFinishFailed = errors => {
      console.log(errors);
    };

    return {
      formState,
      handleFinish,
      handleFinishFailed,
    };
  },
  data() {
    return {
      title: "Welcome to Deer"
    }
  },
  methods: {
    async login() {

      const response = await http.post("/login", {
        "name": this.formState.user,
        "password": this.formState.password
      })
      this.$store.commit("set_profile", {
        "token": response.data.token,
        "username": this.formState.user,
        "email": response.data.email,
        "vip": response.data.vip,
      })
      await this.$router.push("/home")

    }
  },
}

</script>


<style>
.main {
  background: rgba(128, 128, 128, 0.08);
  height: 422px;
  margin-top: 60px;
  text-align: center;
  padding: 50px;
}

.inner {
  padding-left: 50px;
  padding-right: 50px;
  text-align: center;
}

.login {
  height: 100%;
}
</style>