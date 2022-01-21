<template>
  <a-row type="flex" justify="center" :gutter="[0, 0]" class="m">
    <a-col :xs="{ span: 20 }" :sm="16" :md="12" :lg="8" :xl="{ span: 8 }" class="main">
      <h1>{{ title }}</h1>
      <a-form
          :model="formState"
          @finish="handleFinish"
          @finishFailed="handleFinishFailed"
          labelAlign="right"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
      >
        <a-form-item label="账户" has-feedback>
          <a-input v-model:value="formState.user" placeholder="Username">
            <template #prefix>
              <UserOutlined style="color: rgba(0, 0, 0, 0.25)"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="邮箱" has-feedback name="email">
          <a-input
              v-model:value="formState.email"
              type="email"
              placeholder="Password"
              autocomplete="off"
          >
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="新密码">
          <a-input
              v-model:value="formState.password"
              type="password"
              placeholder="Password"
              autocomplete="off"
          >
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="重复新密码">
          <a-input
              v-model:value="formState.repeatPassword"
              type="password"
              placeholder="RepeatPassword"
          >
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
              type="primary"
              html-type="submit"
              :disabled="formState.user === '' || formState.password === '' || formState.repeatPassword === '' || formState.email === ''"
              @click="resetPass"
          >修改密码
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>


<script>
import {message} from 'ant-design-vue';
import {reactive} from 'vue';
import http from '../axios';

export default {
  name: "Forget",
  setup() {

    const formState = reactive({
      user: '',
      password: '',
      repeatPassword: '',
      email: '',
    });

    const handleFinish = values => {
      console.log(values, formState);
    };

    const handleFinishFailed = errors => {
      console.log(errors);
    };

    return {
      labelCol: {
        style: {
          width: '100px',
        },
      },
      wrapperCol: {
        span: 24,
      },
      formState,
      handleFinish,
      handleFinishFailed,

    };
  },
  data() {
    return {
      title: '重置密码'
    }
  },
  methods: {

    async resetPass() {
      if (this.formState.password != this.formState.repeatPassword) {
        message.warn("两次输入密码不一致")
        return
      }
      const response = await http.patch("/password", {
        "name": this.formState.user,
        "password": this.formState.password,
        "email": this.formState.email
      });
      if (response['code'] === 200) {
        await this.$router.push("/login")
      }
    }
  },
}

</script>

<style>.m {
  height: 100%;
}


</style>