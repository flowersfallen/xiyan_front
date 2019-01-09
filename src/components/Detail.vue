<template>
  <div>
    <sui-card  class="fluid">
      <sui-card-content>
        <sui-image v-if="post.avatar" v-bind:src="post.avatar" shape="circular" size="mini"/>
        {{ post.name }}
        <sui-card-meta slot="right">{{ post.created_at }}</sui-card-meta>
      </sui-card-content>
      <sui-image v-if="post.attachment" v-bind:src="post.attachment" />
      <sui-card-content>
        <sui-card-description>{{ post.content }}</sui-card-description>
      </sui-card-content>
      <sui-card-content>
        <span slot="right">
          <sui-icon name="heart outline" v-on:click='digg' /> {{ post.digg }} likes
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
            <a is="sui-comment-author">{{ item.name }}</a>
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
      comment: '',
      list: []
    }
  },
  created () {
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
        this.error = '接口请求失败'
      }
    }).catch(error => {
      console.log(error)
    })
    this.$ajax({
      method: 'get',
      url: process.env.BASE_API + '/api/v2/comment_list',
      params: {
        post_id: this.post_id,
        keyword: ''
      }
    }).then(res => {
      if (res.status === 200) {
        if (res.data.state) {
          this.list = res.data.data.list
        } else {
          this.$store.dispatch('setError', res.data.error)
        }
      } else {
        this.error = '接口请求失败'
      }
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
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

          } else {
            this.$store.dispatch('setError', res.data.error)
          }
        } else {
          this.error = '接口请求失败'
        }
      }).catch(error => {
        console.log(error)
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

          } else {
            this.$store.dispatch('setError', res.data.error)
          }
        } else {
          this.error = '接口请求失败'
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
