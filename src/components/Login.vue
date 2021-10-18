<template>
    <a-row type="flex" justify="center">
        <a-col :span="8" class="main">
            <div class="inner">
                <a-space direction="vertical" size="large">
                    <h1>{{ title }}</h1>
                    <a-form
                        :model="formState"
                        @finish="handleFinish"
                        @finishFailed="handleFinishFailed"
                        class="m_form"
                    >
                        <a-form-item label="账户">
                            <a-input v-model:value="formState.user" placeholder="Username">
                                <template #prefix>
                                    <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item label="密码">
                            <a-input
                                v-model:value="formState.password"
                                type="password"
                                placeholder="Password"
                            >
                                <template #prefix>
                                    <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-button
                                type="primary"
                                html-type="submit"
                                :disabled="formState.user === '' || formState.password === ''"
                                @click="login"
                            >登录</a-button>
                        </a-form-item>
                    </a-form>
                </a-space>
            </div>
        </a-col>
    </a-row>
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
            title: "Welcome to DeerBook"
        }
    },
    methods: {
        async login() {

            var response = await http.post("/login", {
                "name": this.formState.user,
                "password": this.formState.password
            })
            this.$store.commit("set_profile", {
                "token": response.data.token,
                "username": this.formState.user,
                "emial": response.data.email
            })
            this.$router.push("/home")

        }
    },
}

</script>



<style>
.main {
    width: 400px;
    background: rgba(128, 128, 128, 0.08);
    height: 422px;
    margin-top: 60px;
}
.inner {
    padding-left: 150px;
    padding-right: 150px;
    text-align: center;
}
</style>