<template>
  <sui-segment>
    <div class="ui form">
      <sui-form-field>
        <sui-input placeholder="昵称" v-model="user.name" class="fluid" />
      </sui-form-field>
      <sui-form-field>
        <textarea placeholder="签名" v-model="user.sign" ></textarea>
      </sui-form-field>
      <sui-form-field>
        <label>小头像,列表展示,建议大小(50*50)</label>
        <input type="file" accept="image/*" capture="camera" @change="getFile($event, 'small')">
      </sui-form-field>
      <sui-form-field>
        <sui-image v-if="user.avatar" v-bind:src="user.avatar" />
      </sui-form-field>
      <sui-form-field>
        <label>大头像,详情展示,建议大小(800*800)</label>
        <input type="file" accept="image/*" capture="camera" @change="getFile($event, 'big')">
      </sui-form-field>
      <sui-form-field>
        <sui-image v-if="user.avatar_big" v-bind:src="user.avatar_big" />
      </sui-form-field>
      <sui-button content="提交" class="fluid" v-on:click='submit'/>
    </div>
  </sui-segment>
</template>

<script>
export default {
  name: 'UserEdit',
  data () {
    return {
      user: {}
    }
  },
  created () {
    var str = localStorage.getItem('xiyan_user')
    var json = JSON.parse(str)
    this.user = json
  },
  methods: {
    getFile: function (event, type) {
      var file = event.target.files[0]
      var formData = new FormData()
      formData.append('file', file)

      this.$ajax({
        method: 'post',
        url: process.env.BASE_API + '/api/v2/file_upload',
        data: formData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            if (type === 'small') {
              this.user.avatar = res.data.data.url
            } else {
              this.user.avatar_big = res.data.data.url
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
    submit: function () {
      this.$ajax({
        method: 'post',
        url: process.env.BASE_API + '/api/auth/user_edit',
        data: {
          name: this.user.name,
          sign: this.user.sign,
          avatar: this.user.avatar,
          avatar_big: this.user.avatar_big
        }
      }).then(res => {
        if (res.status === 200) {
          this.$store.dispatch('profile', res.data.data)
          if (res.data.state) {
            this.$router.push({ path: 'user', query: {redirect: this.$router.currentRoute.fullPath} })
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
