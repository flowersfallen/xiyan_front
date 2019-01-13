<template>
  <sui-segment>
    <sui-input placeholder="昵称" v-model="name" class="fluid" />
    <br/>
    <sui-input placeholder="邮箱" v-model="email" class="fluid" />
    <br/>
    <sui-input placeholder="密码" v-model="password" class="fluid" />
    <br/>
    <sui-input placeholder="邀请码" v-model="code" class="fluid" />
    <br/>
    <div is="sui-button-group" class="fluid">
      <sui-button><a href="#/login">登录</a></sui-button>
      <sui-button-or />
      <sui-button positive v-on:click='register'>注册</sui-button>
    </div>
  </sui-segment>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      code: ''
    }
  },
  methods: {
    register: function () {
      this.$ajax({
        method: 'post',
        url: process.env.BASE_API + '/api/auth/register',
        data: {
          name: this.name,
          email: this.email,
          password: this.password,
          code: this.code
        }
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
a {
  color:#0009;
}
</style>
