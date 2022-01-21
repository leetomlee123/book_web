<template>
<div class="m">
    <a-row type="flex" justify="center" :gutter="[0, 0]" >
        <a-col :xs="{ span: 20 }" :sm="16" :md="12" :lg="8" :xl="{ span:8 }" class="main">
            <h1>{{ title }}</h1>
            <a-form
                :model="formState"
                ref="formRef"
                @finish="handleFinish"
                @finishFailed="handleFinishFailed"
                :label-col="labelCol" :wrapper-col="wrapperCol"
                >
                <a-form-item label="账户" >
                    <a-input v-model:value="formState.user" placeholder="Username">
                        <template #prefix>
                            <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item label="密码" has-feedback >
                    <a-input
                        v-model:value="formState.password"
                        type="password"
                        placeholder="Password"
                        autocomplete="off"
                    >
                        <template #prefix>
                            <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item label="重复密码" has-feedback  labelAlgin="right">
                    <a-input
                        v-model:value="formState.repeatPassword"
                        type="password"
                        placeholder="Password"
                        autocomplete="off"
                    >
                        <template #prefix>
                            <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item label="邮箱" has-feedback>
                    <a-input v-model:value="formState.email" type="email" placeholder="email">
                        <template #prefix>
                            <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-button
                        type="primary"
                        html-type="submit"
                        :disabled="formState.user === '' || formState.password === '' || formState.repeatPassword === '' || formState.email === ''"
                        @click="register"
                    >注册</a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
    </div>
</template>



<script>
import { message } from 'ant-design-vue';
import { reactive, ref } from 'vue';
import http from '../axios';
export default {
    name: "Register",
    setup() {
        const formRef = ref();
        let validatePass = async (rule, value) => {
            if (value === '') {
                return Promise.reject('Please input the password');
            } else {
                if (formState.repeatPassword !== '') {
                    formRef.value.validateFields('checkPass');
                }

                return Promise.resolve();
            }
        };

        let validatePass2 = async (rule, value) => {
            if (value === '') {
                return Promise.reject('Please input the password again');
            } else if (value !== formState.pass) {
                return Promise.reject("Two inputs don't match!");
            } else {
                return Promise.resolve();
            }
        };
        const rules = {
            pass: [
                {
                    required: true,
                    validator: validatePass,
                    trigger: 'change',
                },
            ],
            checkPass: [
                {
                    validator: validatePass2,
                    trigger: 'change',
                },
            ],

        };
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
            rules,
            formRef
        };
    },
    data() {
        return {
            title: '注册账号'
        }
    },
    methods: {

        async register() {
            if (this.formState.password != this.formState.repeatPassword) {
                message.warn("两次输入密码不一致")
                return
            }
            var response = await http.post("/register", {
                "name": this.formState.user,
                "password": this.formState.password,
                "email": this.formState.email
            })
            if (response['code'] == 200) {
                this.$router.push("/login")
            }
        }
    },
}

</script>
<style>

.m {

    height: 100%;
}


</style>