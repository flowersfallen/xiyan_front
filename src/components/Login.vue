<template>
  <sui-segment>
    <sui-input placeholder="email" v-model="email" class="fluid" />
    <br/>
    <sui-input placeholder="password" v-model="password" class="fluid" />
    <br/>
    <sui-button content="提交" class="fluid" v-on:click='login' />

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

  </sui-segment>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      token: '',
      error: '',
      open: false
    }
  },
  methods: {
    toggle: function () {
      this.open = !this.open
    },
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
            this.token = res.data.data.token
            this.$router.push({ path: 'post' })
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
