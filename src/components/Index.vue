<template>
  <div class="index">
    <h1>{{ msg }}</h1>
    <h1>{{ data }}</h1>
    <h1>{{ error }}</h1>

    <button v-on:click="getData">获取数据</button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: '首页',
      data: [],
      error: ''
    }
  },
  methods: {
    getData () {
      this.$ajax({
        method: 'get',
        url: process.env.BASE_API + '/api/v2/index',
        data: {
          token: 'token'
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.data = res.data.data
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
