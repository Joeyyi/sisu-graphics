import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Campus from '@/views/Campus'
import Floor from '@/views/Floor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/campus',
      name: 'campus',
      component: Campus
    },
    {
      path: '/floor',
      name: 'floor',
      component: Floor
    }
  ]
})
