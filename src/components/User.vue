<template>
  <div>
    <sui-menu fixed="top">
      <sui-menu-menu position="left">
        <sui-menu-item left>
          <a href='#/post_add'><i class="add icon"></i></a>
        </sui-menu-item>
      </sui-menu-menu>
    </sui-menu>

    <sui-card  class="fluid">
      <sui-image v-if="user.avatar_big" v-bind:src="user.avatar_big" />
      <sui-card-content>
        <sui-card-header>{{ user.name }}</sui-card-header>
        <sui-card-meta>{{ user.created_at }}</sui-card-meta>
        <sui-card-description>{{ user.sign }}</sui-card-description>
      </sui-card-content>
      <sui-card-content extra v-if="!user_id">
        <sui-container text-align="center">
            <sui-button-group>
              <!-- <sui-button basic>帖子</sui-button>
              <sui-button basic>话题</sui-button>
              <sui-button basic>关注</sui-button> -->
              <sui-button basic><a style="color:#0009;" href="#/user_edit">编辑</a></sui-button>
              <sui-button basic v-on:click='logout'>退出</sui-button>
            </sui-button-group>
          </sui-container>
      </sui-card-content>
    </sui-card>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      user: {},
      user_id: ''
    }
  },
  created () {
    var userId = this.$route.query.user_id
    if (userId) {
      this.user_id = userId
    }
    this.$ajax({
      method: 'get',
      url: process.env.BASE_API + '/api/auth/user',
      params: {
        user_id: this.user_id
      }
    }).then(res => {
      if (res.status === 200) {
        if (res.data.state) {
          this.user = res.data.data
          if (!this.user_id) {
            this.$store.dispatch('profile', res.data.data)
          }
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
  methods: {
    logout: function () {
      this.$ajax({
        method: 'post',
        url: process.env.BASE_API + '/api/auth/logout'
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.$router.push({ path: '/login' })
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
