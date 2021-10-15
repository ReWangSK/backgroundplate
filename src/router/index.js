import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import users from '../components/users/users.vue'
import total from '../components/total/total.vue'
import date from '../components/date/date.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/', redirect: '/Login'
    },
    {
      path: '/Login', component: login
    },
    {
      path: '/home',
      component: home,
      children: [{
        path: '/users', component: users
      },
      {
        path: '/total', component: total
      },
      {
        path: '/date', component: date
      }]
    }
  ]
})
// 设置导航路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/Login') return next()// 放行
//   // eslint-disable-next-line no-use-before-define
//   const tokenStr = window.sessionStorage.setItem('token')
//   if (!tokenStr) return next('/Login')
//   next()// 放行
// })
export default router
