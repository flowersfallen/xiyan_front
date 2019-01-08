import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import List from '@/components/List'
import Show from '@/components/Show'

import Post from '@/components/Post'
import Topic from '@/components/Topic'
import Notice from '@/components/Notice'
import User from '@/components/User'
import Detail from '@/components/Detail'
import Login from '@/components/Login'
import TopicAdd from '@/components/TopicAdd'
import PostAdd from '@/components/PostAdd'

import axios from 'axios'

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('xiyan_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data.message === 'login') {
      localStorage.removeItem('xiyan_token')
      router.replace({
        path: 'Login',
        query: {redirect: router.currentRoute.fullPath}
      })
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('xiyan_token')
          router.replace({
            path: 'Login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response.data)
  }
)

Vue.prototype.$ajax = axios

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: Post
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
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/topic',
      name: 'Topic',
      component: Topic
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/topic_add',
      name: 'TopicAdd',
      component: TopicAdd,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/post_add',
      name: 'PostAdd',
      component: PostAdd,
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem('xiyan_token')) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
