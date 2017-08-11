import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import DashBord from '@/components/DashBord'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashbord',
      name: 'dashbord',
      component: DashBord,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
      meta: {
        requireAuth: true
      }
    }
  ]
})
