<template>
  <div class="index">
    <h1>{{ msg }}</h1>
    <p>推荐圈子</p>
    <ul v-if = "show == 'setting'">
      <ol v-for="item in setting.group_recommend" v-bind:key="item.id">
        {{item.id}}  {{item.title}}  {{item.thumb}}
      </ol>
    </ul>
    <p>推荐话题</p>
    <ul v-if = "show == 'setting'">
      <ol v-for="item in setting.topic_recommend" v-bind:key="item.id">
        {{item.id}}  {{item.title}}  {{item.thumb}}
      </ol>
    </ul>
    <p>轮播图</p>
    <ul v-if = "show == 'setting'">
      <ol v-for="item in setting.slide" v-bind:key="item.thumb">
        {{item.thumb}}  {{item.url}}
      </ol>
    </ul>
    <p>动态 {{ dynamic.total }}</p>
    <ul v-if = "show == 'dynamic'">
      <ol v-for="item in dynamic.list" v-bind:key="item.thumb">
        {{item.id}}  {{item.title}}
      </ol>
    </ul>
    <p>发现圈子 {{ group.total }}</p>
    <ul v-if = "show == 'group'">
      <ol v-for="item in group.list" v-bind:key="item.thumb">
        {{item.id}}  {{item.title}} {{item.thumb}}
      </ol>
    </ul>
    <p>新增话题</p>
    <ul v-if = "show == 'new_topic'">
      {{new_topic.id}}  {{new_topic.title}}
    </ul>
    <p>新增评论</p>
    <ul v-if = "show == 'new_comment'">
      {{new_comment.id}}  {{new_comment.content}}
    </ul>
    <p>token</p>
    <transition name="slide-fade">
      <ul v-if = "show == 'token'">
        {{ token }}
      </ul>
    </transition>
    <p>user</p>
    <ul v-if = "show == 'user'">
      {{ user.member_id }}  {{ user.name }}
    </ul>
    <h1>{{ error }}</h1>

    <button v-on:click="getSetting">刷新设置</button><br/>

    <input v-model="type" placeholder="动态类型">
    <button v-on:click="getDynamic">刷新动态</button><br/>

    <input v-model="list" placeholder="圈子类型">
    <input v-model="keyword" placeholder="关键词">
    <button v-on:click="getGroup">发现圈子</button><br/>

    <input v-model="parent_id" placeholder="首发话题id">
    <input v-model="group_id" placeholder="圈子id">
    <input v-model="title" placeholder="标题">
    <input v-model="content" placeholder="内容">
    <input v-model="attachments" placeholder="图片或视频地址">
    <input v-model="has_video" placeholder="是否包含视频">
    <button v-on:click="addTopic">发布话题</button><br/>

    <input v-model="topic_id" placeholder="话题id">
    <input v-model="group_id" placeholder="圈子id">
    <input v-model="content" placeholder="内容">
    <button v-on:click="addComment">发布评论</button><br/>

    <button v-on:click="getToken">获取token</button><br/>
    <button v-on:click="getUser">获取user</button><br/>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: '首页',
      show: '',
      setting: {
        group_recommend: [],
        topic_recommend: [],
        slide: []
      },
      dynamic: {
        list: [],
        total: ''
      },
      group: {
        list: [],
        total: ''
      },
      new_topic: {
        data: {}
      },
      new_comment: {
        data: {}
      },
      user: {
        data: {}
      },
      token: '',
      type: 'new',
      list: 'all',
      keyword: '',
      page: 1,
      pagesize: 15,
      error: '',
      parent_id: '',
      group_id: '',
      title: '',
      content: '',
      attachments: '',
      has_video: '',
      topic_id: '',
      site_id: '10001',
      member_id: '2',
      time: '1545719057',
      sign: '5c35921549a4ad6da20bad5a90883620'
    }
  },
  mounted () {
    // this.getSetting()
    // this.getDynamic()
  },
  methods: {
    getSetting () {
      this.$ajax({
        method: 'get',
        url: process.env.BASE_API + '/api/v2/index',
        params: {
          token: this.token
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.setting = res.data.data
            this.show = 'setting'
          } else {
            this.error = res.data.error
          }
        } else {
          console.log('status not 200')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getDynamic () {
      this.$ajax({
        method: 'get',
        url: process.env.BASE_API + '/api/v2/dynamic',
        params: {
          token: this.token,
          type: this.type,
          keyword: this.keyword,
          page: this.page,
          pagesize: this.pagesize
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.dynamic = res.data.data
            this.show = 'dynamic'
          } else {
            this.error = res.data.error
          }
        } else {
          console.log('status not 200')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getGroup () {
      this.$ajax({
        method: 'get',
        url: process.env.BASE_API + '/api/v2/group',
        params: {
          token: this.token,
          list: this.list,
          keyword: this.keyword,
          page: this.page,
          pagesize: this.pagesize
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.group = res.data.data
            this.show = 'group'
          } else {
            this.error = res.data.error
          }
        } else {
          console.log('status not 200')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    addTopic () {
      this.$ajax({
        method: 'post',
        url: process.env.BASE_API + '/api/v2/topic_add',
        data: {
          token: this.token,
          parent_id: this.parent_id,
          group_id: this.group_id,
          title: this.title,
          content: this.content,
          attachemnts: this.attachments,
          has_video: this.has_video
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.new_topic = res.data.data
            this.show = 'new_topic'
          } else {
            this.error = res.data.error
          }
        } else {
          console.log('status not 200')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    addComment () {
      this.$ajax({
        method: 'post',
        url: process.env.BASE_API + '/api/v2/comment_add',
        data: {
          token: this.token,
          topic_id: this.topic_id,
          group_id: this.group_id,
          content: this.content
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.new_comment = res.data.data
            this.show = 'new_comment'
          } else {
            this.error = res.data.error
          }
        } else {
          console.log('status not 200')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getToken () {
      this.$ajax({
        method: 'post',
        url: process.env.BASE_API + '/api/auth/login',
        data: {
          site_id: this.site_id,
          member_id: this.member_id,
          time: this.time,
          sign: this.sign
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.token = res.data.data.token
            this.show = 'token'
          } else {
            this.error = res.data.error
          }
        } else {
          console.log('status not 200')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getUser () {
      this.$ajax({
        method: 'get',
        url: process.env.BASE_API + '/api/auth/user',
        params: {
          token: this.token
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.user = res.data.data
            this.show = 'user'
          } else {
            this.error = res.data.error
          }
        } else {
          console.log('status not 200')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
</style>
