<template>
  <sui-segment>
    <sui-input placeholder="邮箱" v-model="email" class="fluid" />
    <br/>
    <sui-input placeholder="密码" v-model="password" class="fluid" />
    <br/>
    <div is="sui-button-group" class="fluid">
      <sui-button positive v-on:click='login'>登录</sui-button>
      <sui-button-or />
      <sui-button><a href="#/register">注册</a></sui-button>
    </div>
  </sui-segment>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      this.$ajax({
        method: 'post',
        url: process.env.BASE_API + '/api/auth/login',
        data: {
          email: this.email,
          password: this.password
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.$store.dispatch('logined', res.data.data)
            var redirect = this.$route.query.redirect
            if (redirect) {
              this.$router.push({ path: redirect })
            } else {
              this.$router.push({ path: '/user' })
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
    }
  }
}
</script>

<style>
a {
  color:#0009;
}
</style>
