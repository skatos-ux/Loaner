import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import MainPage from "@/views/MainPage.vue";
import Users from "@/views/Users.vue";
import Register from "@/views/Register.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/mainpage',
    name: 'mainpage',
    component: MainPage,
    children: [
    {
      path: 'dashboard',
      component: Dashboard
    },
    {
      path: 'users',
      component: Users
    }]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
