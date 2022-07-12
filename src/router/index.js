import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Login from '@/views/Login/Login.vue'

// 引入进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({
  showSpinner: false
});

Vue.use(VueRouter)

const routes = [
  {
    // 重定向
    path: '/',
    redirect: '/Login'
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    component: Home,
    children: [
      {
        path: '/Main',
        name: 'Main',
        meta: { name: "首页", title: '首页' },
        component: () => import('@/pages/MainHome')
      },
      {
        path: '/UserList',
        name: 'UserList',
        meta: { firstName: '用户管理', name: "用户列表", title: '用户列表' },
        component: () => import('@/pages/User/User.vue')
      },
      {
        path: '/Commodity',
        name: 'Commodity',
        meta: { firstName: '商品管理', name: "商品列表", title: '商品列表' },
        component: () => import('@/pages/Commodity/Commodity.vue')
      },
      {
        path: '/EchartsCommodity',
        name: 'EchartsCommodity',
        meta: { firstName: '商品管理', name: "商品数据", title: '商品数据' },
        component: () => import('@/pages/Commodity/EchartsCommodity.vue')
      },
      {
        path: '/EchartsPrice',
        name: 'EchartsPrice',
        meta: { firstName: '商品管理', name: "商品价格对比", title: '商品价格对比' },
        component: () => import('@/pages/Commodity/EchartsPrice.vue')
      },
      {
        path: '/Orders',
        name: 'Orders',
        meta: { firstName: '订单管理', name: "订单列表", title: '订单列表' },
        component: () => import('@/pages/Orders/Orders.vue')
      },
      {
        path: '/OrderData',
        name: 'OrderData',
        meta: { firstName: '订单管理', name: "订单数据", title: '订单数据' },
        component: () => import('@/pages/Orders/OrderData.vue')
      },
      {
        path: '/Message',
        name: 'Message',
        meta: { firstName: '消息中心', name: "消息列表", title: '消息列表' },
        component: () => import('@/pages/Message/MessageList.vue')
      },
      {
        path: '/MessagePublish',
        name: 'MessagePublish',
        meta: { firstName: '消息中心', name: "消息发布", title: '消息发布' },
        component: () => import('@/pages/Message/MessagePublish.vue')
      },
      {
        path: '/Error',
        name: 'Error',
        meta: { firstName: '错误处理', name: "404页面", title: '404页面' },
        component: () => import('@/pages/Error/Error.vue')
      },
      {
        path: '/Permissions',
        name: 'Permissions',
        meta: { firstName: '错误处理', name: "权限测试", title: '权限测试' },
        component: () => import('@/pages/Error/Permissions.vue')
      },
      {
        path: '/Chat',
        name: 'Chat',
        meta: { firstName: '聊天室', name: "聊天室", title: '聊天室' },
        component: () => import('@/pages/Chat/Chat.vue')
      },
      {
        path: '/Stats',
        name: 'Stats',
        meta: { firstName: '数据统计', name: "数据报表", title: '数据报表' },
        component: () => import('@/pages/Stats/Stats.vue')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

// 在前置导航守卫中开启(main.js中一样)
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'YOUAH';
  const user = localStorage.getItem('loginUserInfo');
  if (user == null && to.path !== '/Login') {
    NProgress.start(); // 开启进度条
    next('/Login');
    NProgress.done(); // 关闭进度条
  } else {
    NProgress.start(); // 开启进度条
    next();
  }

});
// 在后置导航守卫中开启
router.afterEach(() => {
  NProgress.done(); // 关闭进度条
});

export default router
