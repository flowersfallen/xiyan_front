<template>
  <div>
    <sui-card  class="fluid">
      <sui-image v-if="user.avatar_big" v-bind:src="user.avatar_big" />
      <sui-card-content>
        <sui-card-header>{{ user.name }}</sui-card-header>
        <sui-card-meta>{{ user.created_at }}</sui-card-meta>
        <sui-card-description>{{ user.sign }}</sui-card-description>
      </sui-card-content>
      <sui-card-content extra>
        <sui-container text-align="center">
            <sui-button-group>
              <sui-button basic>帖子</sui-button>
              <sui-button basic>话题</sui-button>
              <sui-button basic>关注</sui-button>
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
      user: {}
    }
  },
  created () {
    this.$ajax({
      method: 'get',
      url: process.env.BASE_API + '/api/auth/user',
      params: {
        keyword: ''
      }
    }).then(res => {
      if (res.status === 200) {
        if (res.data.state) {
          this.user = res.data.data
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
</script>

<style>
</style>
