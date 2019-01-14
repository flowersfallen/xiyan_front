<template>
  <div>
    <sui-card  class="fluid">
      <sui-card-content>
        <a v-bind:href="'#/user?user_id=' + post.created_by">
          <sui-image v-if="post.avatar" v-bind:src="post.avatar" shape="circular" size="mini"/>
        </a>
        <a v-bind:href="'#/user?user_id=' + post.created_by">{{ post.name }}</a>
        <sui-card-meta slot="right">{{ post.created_at }}</sui-card-meta>
      </sui-card-content>
      <sui-image v-if="post.attachment" v-bind:src="post.attachment" />
      <sui-card-content>
        <sui-card-description>{{ post.content }}</sui-card-description>
      </sui-card-content>
      <sui-card-content>
        <span slot="right">
          <sui-icon v-bind:class="{ red: post.digged }" name="heart" v-on:click='digg' /> {{ post.digg }} likes
        </span>
        <sui-icon name="comment" /> {{ post.comment }} comments
      </sui-card-content>
    </sui-card>

    <sui-divider />

    <sui-segment>
      <sui-comment-group>
        <sui-comment v-for="item in list" v-bind:item="item" v-bind:key="item.id">
          <sui-comment-avatar v-if="item.avatar" v-bind:src="item.avatar" />
          <sui-comment-content>
            <a is="sui-comment-author" v-bind:href="'#/user?user_id=' + item.created_by">{{ item.name }}</a>
            <sui-comment-metadata>
              <div>{{ item.created_at }}</div>
            </sui-comment-metadata>
            <sui-comment-text>{{ item.content }}</sui-comment-text>
          </sui-comment-content>
        </sui-comment>
      </sui-comment-group>

      <div class="ui left icon action input fluid">
        <i class="comments icon"></i>
        <input type="text" placeholder="评论" v-model="comment" />
        <div class="ui blue submit button" v-on:click='submit'>发布</div>
      </div>
    </sui-segment>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      post_id: '',
      post: {},
      list: [],
      comment: ''
    }
  },
  created () {
    this.getPost()
    this.getComment()
  },
  methods: {
    getPost: function () {
      var postId = this.$route.query.post_id
      if (postId) {
        this.post_id = postId
      }
      this.$ajax({
        method: 'get',
        url: process.env.BASE_API + '/api/v2/post_detail',
        params: {
          id: this.post_id
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.post = res.data.data
          } else {
            this.$store.dispatch('setError', res.data.error)
          }
        } else {
          this.$store.dispatch('setError', '接口请求失败')
        }
      }).catch(error => {
        console.log(error)
        this.$store.dispatch('setError', '接口请求异常')
      })
    },
    getComment: function () {
      var postId = this.$route.query.post_id
      if (postId) {
        this.post_id = postId
      }
      this.$ajax({
        method: 'get',
        url: process.env.BASE_API + '/api/v2/comment_list',
        params: {
          post_id: this.post_id
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.list = res.data.data.list
          } else {
            this.$store.dispatch('setError', res.data.error)
          }
        } else {
          this.$store.dispatch('setError', '接口请求失败')
        }
      }).catch(error => {
        console.log(error)
        this.$store.dispatch('setError', '接口请求异常')
      })
    },
    submit: function () {
      this.$ajax({
        method: 'post',
        url: process.env.BASE_API + '/api/v2/comment_add',
        data: {
          post_id: this.post_id,
          content: this.comment
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.getPost()
            this.getComment()
          } else {
            this.$store.dispatch('setError', res.data.error)
          }
        } else {
          this.$store.dispatch('setError', '接口请求失败')
        }
      }).catch(error => {
        console.log(error)
        this.$store.dispatch('setError', '接口请求异常')
      })
    },
    digg: function () {
      this.$ajax({
        method: 'post',
        url: process.env.BASE_API + '/api/v2/post_interact',
        data: {
          id: this.post_id,
          type: 'digg'
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.getPost()
          } else {
            this.$store.dispatch('setError', res.data.error)
          }
        } else {
          this.$store.dispatch('setError', '接口请求失败')
        }
      }).catch(error => {
        console.log(error)
        this.$store.dispatch('setError', '接口请求异常')
      })
    }
  }
}
</script>

<style>
</style>
