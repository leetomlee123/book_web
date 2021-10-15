import { message } from "ant-design-vue";
import axios from "axios";
import router from './router';
import store from './store';
const http = axios.create({
    baseURL: 'http://134.175.83.19:8011/v1',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

// http request 拦截器
http.interceptors.request.use(
    config => {
        if (store.state.profile.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.auth = store.state.profile.token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
http.interceptors.response.use(
    response => {
        var code = response.data.code
        if (!(code == 200 || code == 201)) {
            message.error(response.data.msg)
        }
        return response.data;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit('logout');
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
            }
        }
        return Promise.reject(error)   // 返回接口返回的错误信息
    });

export default http