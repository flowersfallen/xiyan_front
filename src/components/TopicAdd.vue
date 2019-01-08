<template>
  <sui-segment>
    <sui-input placeholder="话题" v-model="title" class="fluid" />
    <br/>
    <div class="ui form">
      <textarea placeholder="描述" v-model="description"></textarea>
    </div>
    <br/>
    <sui-button content="提交" class="fluid" v-on:click='submit' />

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
  name: 'TopicAdd',
  data () {
    return {
      title: '',
      description: '',
      error: '',
      open: false
    }
  },
  methods: {
    toggle: function () {
      this.open = !this.open
    },
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
