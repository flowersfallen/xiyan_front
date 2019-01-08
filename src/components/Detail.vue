<template>
  <div>
    <sui-card  class="fluid">
      <sui-card-content>
        <sui-image
          src="https://semantic-ui.com/images/avatar2/large/kristy.png"
          shape="circular"
          size="mini"
        />
        Elliot
        <sui-card-meta slot="right">14h</sui-card-meta>
      </sui-card-content>
      <sui-image src="https://semantic-ui.com/images/avatar2/large/kristy.png" />
      <sui-card-content>
        <sui-card-description>想什么在呢</sui-card-description>
      </sui-card-content>
      <sui-card-content>
        <span slot="right">
          <sui-icon name="heart outline" /> 17 likes
        </span>
        <sui-icon name="comment" /> 3 comments
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

    <sui-modal v-model="open">
      <sui-modal-header>错误提示</sui-modal-header>
      <sui-modal-content>
        {{error}}
      </sui-modal-content>
      <sui-segment>
        <sui-button positive class="fluid" @click.native="toggle">
          关闭
        </sui-button>
      </sui-segment>
    </sui-modal>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      post_id: '',
      comment: '',
      list: [],
      error: '',
      open: false
    }
  },
  created () {
    var postId = this.$route.query.post_id
    if (postId) {
      this.post_id = postId
    }
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
          this.error = res.data.error
          this.open = true
        }
      } else {
        this.error = '接口请求失败'
      }
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    toggle: function () {
      this.open = !this.open
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
            this.$router.push({ path: 'topic' })
          } else {
            this.error = res.data.error
            this.open = true
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
