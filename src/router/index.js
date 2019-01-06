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
Vue.prototype.$ajax = axios

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Post',
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
      component: Notice
    },
    {
      path: '/user',
      name: 'User',
      component: User
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
      component: TopicAdd
    },
    {
      path: '/post_add',
      name: 'PostAdd',
      component: PostAdd
    }
  ]
})
