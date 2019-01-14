<template>
  <div id="topic">
    <sui-menu fixed="top">
      <sui-menu-menu position="left">
        <sui-menu-item left>
          <a href='#/topic_add'><i class="add icon"></i></a>
        </sui-menu-item>
      </sui-menu-menu>

      <sui-menu-menu position="right">
        <sui-menu-item right>
          <div class="ui right action input">
            <input type="text" v-model="keyword" placeholder="搜帖子">
            <sui-button icon="search" attached="right" v-on:click='getTopic'/>
          </div>
        </sui-menu-item>
      </sui-menu-menu>
    </sui-menu>

    <sui-segment>
      <sui-list divided relaxed>
        <sui-list-item v-for="item in list" v-bind:item="item" v-bind:key="item.id">
          <sui-list-content>
            <a is="sui-list-header" v-bind:href="'#/post?topic_id=' + item.id">{{ item.title }}</a>
            <a is="sui-list-description">{{ item.created_at }}</a>
          </sui-list-content>
        </sui-list-item>
      </sui-list>
    </sui-segment>
  </div>
</template>

<script>
export default {
  name: 'Topic',
  data () {
    return {
      list: [],
      keyword: '',
      page: 1,
      pagesize: 15
    }
  },
  created () {
    this.getTopic()
  },
  methods: {
    getTopic: function () {
      this.$ajax({
        method: 'get',
        url: process.env.BASE_API + '/api/v2/topic_list',
        params: {
          keyword: this.keyword,
          page: this.page,
          pagesize: this.pagesize
        }
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
}
</script>

<style>
</style>
