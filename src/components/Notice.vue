<template>
  <sui-segment>
    <sui-feed v-for="item in list" v-bind:item="item" v-bind:key="item.id">
      <sui-feed-event>
        <sui-feed-label>
          <img v-if="item.avatar" v-bind:src="item.avatar"/>
        </sui-feed-label>
        <sui-feed-content>
          <sui-feed-summary>
            <sui-feed-user>{{ item.name }}</sui-feed-user> {{item.message}}
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
      url: process.env.BASE_API + '/api/v2/notice_list',
      params: {
        keyword: ''
      }
    }).then(res => {
      if (res.status === 200) {
        if (res.data.state) {
          this.list = res.data.data.list
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
</script>

<style>
</style>
