<template>
  <sui-segment>
    <div class="ui form">
      <sui-form-field>
        <sui-dropdown placeholder="选择话题" selection :options="options" v-model="topic_id"/>
      </sui-form-field>
      <sui-form-field>
        <textarea placeholder="内容" v-model="content" ></textarea>
      </sui-form-field>
      <sui-form-field>
        <input type="file" accept="image/png,image/jpg" capture="camera" @change="getFile($event)">
      </sui-form-field>
      <sui-image v-if="file" v-bind:src="file" />
      <sui-button content="提交" class="fluid" v-on:click='submit'/>
    </div>
  </sui-segment>
</template>

<script>
export default {
  name: 'PostAdd',
  data () {
    return {
      topic_id: '',
      options: [],
      content: '',
      file: '',
      error: '',
      open: false
    }
  },
  created () {
    this.$ajax({
      method: 'get',
      url: process.env.BASE_API + '/api/v2/topic_list',
      data: {
        keyword: ''
      }
    }).then(res => {
      if (res.status === 200) {
        if (res.data.state) {
          var topic = res.data.data.list
          var option = []
          var item = {}
          topic.forEach(function (i) {
            item = {
              text: i.title,
              value: i.id
            }
            option.push(item)
          })
          this.options = option
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
    getFile: function (event) {
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
            this.file = res.data.data.url
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
    submit: function () {
      this.$ajax({
        method: 'post',
        url: process.env.BASE_API + '/api/v2/post_add',
        data: {
          content: this.content,
          topic_id: this.topic_id,
          attachment: this.file
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.$router.push({ path: 'post' })
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
