import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import List from '@/components/List'
import Show from '@/components/Show'

import axios from 'axios'
Vue.prototype.$ajax = axios

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/show',
      name: 'Show',
      component: Show
    }
  ]
})
