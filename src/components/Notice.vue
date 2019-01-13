<template>
  <sui-segment>
    <sui-feed v-for="item in list" v-bind:item="item" v-bind:key="item.id">
      <sui-feed-event>
        <sui-feed-label>
          <img v-if="item.avatar" v-bind:src="item.avatar"/>
        </sui-feed-label>
        <sui-feed-content>
          <sui-feed-summary>
            <sui-feed-user><a v-bind:href="'#/user?user_id=' + item.from">{{ item.name }}</a></sui-feed-user> 对<a v-bind:href="'#/detail?post_id=' + item.post_id">你的帖子</a> {{item.message}}
            <sui-feed-date>{{ item.created_at }}</sui-feed-date>
          </sui-feed-summary>
        </sui-feed-content>
      </sui-feed-event>
    </sui-feed>
  </sui-segment>
</template>

<script>
export default {
  name: 'Notice',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.$ajax({
      method: 'get',
      url: process.env.BASE_API + '/api/v2/notice_list'
    }).then(res => {
      if (res.status === 200) {
        if (res.data.state) {
          this.list = res.data.data.list
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
</script>

<style>
</style>
