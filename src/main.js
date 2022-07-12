import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 全局样式
import '@/assets/css/index.css';

// 引入echarts
import echarts from '@/assets/js/ECharts.js';
Vue.use(echarts);

// 时间 moment插件
// import moment from 'moment/moment';
// Vue.filter('moment', function (value, formatString) {
//   formatString = formatString || 'YYYY年MM月DD日 HH:mm';
//   return moment(value).format(formatString);
// });

// 引入路由
import router from './router';
import VueRouter from 'vue-router';
// 解决连续点击多次搜索报错问题
// 先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|relace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // call 和 apply 的区别
    // 相同点：都可以调用函数，都可以篡改函数的上下文一次
    // 不同点：call和apply传递参数，call传递参数用逗号隔开，apply传递参数用数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { });
  }
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
