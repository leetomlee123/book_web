import axios  from "axios";
import store from './store'
import router from './router'
const http = axios.create({
    baseURL: 'http://172.20.41.71:7071',
    // timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

  // http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization =  store.state.token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
http.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit('logout');
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error)   // 返回接口返回的错误信息
});

  export default http