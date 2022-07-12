// 对axios进行二次封装
import axios from 'axios';
// 引入进度条
// import nprogress from 'nprogress';
// start：进度条开始   done：进度条结束
// 引入进度条的样式
// import 'nprogress/nprogress.css';

// 利用axios 对象方法 create 创建一个axios实例
const requests = axios.create({
    // 基础路径
    // baseURL: '/api',
    // 请求超时时间
    timeout: 5000,
});

// 请求拦截器
requests.interceptors.request.use((config) => {
    // config：请求的配置对象
    // 进度条开始
    // nprogress.start()
    return config;
});

// 响应拦截器
requests.interceptors.response.use((res) => {
    // response：响应对象
    // 进度条结束
    // nprogress.done();
    return res.data;
}, (err) => {
    // err：错误对象
    return Promise.reject(new Error('faile'));
});

// 对外暴露
export default requests;