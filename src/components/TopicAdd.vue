<template>
  <sui-segment>
    <sui-input placeholder="话题标题" v-model="title" class="fluid" />
    <br/>
    <div class="ui form">
      <textarea placeholder="话题描述" v-model="description"></textarea>
    </div>
    <br/>
    <sui-button content="发话题" class="fluid" v-on:click='submit' />
  </sui-segment>
</template>

<script>
export default {
  name: 'TopicAdd',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    submit: function () {
      this.$ajax({
        method: 'post',
        url: process.env.BASE_API + '/api/v2/topic_add',
        data: {
          title: this.title,
          description: this.description
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.$router.push({ path: 'topic' })
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
