import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 解决两次访问相同路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
const routes = [{
    path: '/',
    // name: 'Home',
    // component: Home,
    redirect: '/home  '
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  // 首页
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/index',
    component: () => import('../views/Home.vue'),
    children: [
      // 默认显示
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/Home/index.vue')
      },
      // 用户
      {
        path: 'users',
        name: 'user',
        component: () => import('../views/Home/user.vue')
      },
      {
        path: "roles",
        name: "roles",
        component: () => import('../views/Home/Roles')
      },
      {
        path: "rights",
        name: "rights",
        component: () => import('../views/Home/Rights')
      },
      {
        path: "goods",
        name: "goods",
        component: () => import('../views/Home/Goods')
      },
      {
        path: "params",
        name: "params",
        component: () => import('../views/Home/Params')
      },
      {
        path: "categories",
        name: "categories",
        component: () => import('../views/Home/Categories')
      },
      {
        path: "orders",
        name: "orders",
        component: () => import('../views/Home/Orders')
      },
      {
        path: "reports",
        name: "reports",
        component: () => import('../views/Home/Reports')
      },
    ],
    
  },


]

const router = new VueRouter({
  routes
})

export default router