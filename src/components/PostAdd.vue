<template>
  <sui-segment>
    <div class="ui form">
      <sui-form-field v-if="!search_id">
        <sui-dropdown placeholder="选择话题" selection search :options="options" v-model="topic_id"/>
      </sui-form-field>
      <sui-form-field v-if="search_id">
        <sui-input v-model="search_title" class="fluid" />
      </sui-form-field>
      <sui-form-field>
        <textarea placeholder="帖子内容" v-model="content" ></textarea>
      </sui-form-field>
      <sui-form-field>
        <input type="file" accept="image/*" @change="getFile($event)">
      </sui-form-field>
      <sui-form-field>
        <sui-image v-if="file" v-bind:src="file" />
      </sui-form-field>
      <sui-form-field>
        <sui-button content="发帖子" class="fluid" v-on:click='submit'/>
      </sui-form-field>
    </div>
  </sui-segment>
</template>

<script>
export default {
  name: 'PostAdd',
  data () {
    return {
      topic_id: null,
      search_id: '',
      search_title: '',
      options: [],
      content: '',
      file: ''
    }
  },
  created () {
    var topicId = this.$route.query.topic_id
    if (topicId) {
      this.topic_id = topicId
      this.search_id = topicId
    }
    this.$ajax({
      method: 'get',
      url: process.env.BASE_API + '/api/v2/topic_list',
      params: {
        topic_id: this.topic_id,
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
          if (this.options.length === 1) {
            this.search_title = this.options[0].text
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
            this.file = res.data.data.middle_url
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
