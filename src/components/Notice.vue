<template>
  <div>
    <sui-menu fixed="top">
      <sui-menu-menu position="left">
        <sui-menu-item left>
          <a href='#/post_add'><i class="add icon"></i></a>
        </sui-menu-item>
      </sui-menu-menu>
    </sui-menu>

    <scroller style="padding-top:50px" :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">
      <sui-segment>
        <sui-feed v-for="item in list" v-bind:item="item" v-bind:key="item.id">
          <sui-feed-event>
            <sui-feed-label>
              <a v-bind:href="'#/user?user_id=' + item.from"><img v-if="item.avatar" v-bind:src="item.avatar"/></a>
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
    </scroller>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  data () {
    return {
      list: [],
      total: 0,
      page: 1,
      pagesize: 15
    }
  },
  created () {
    this.getNotice()
  },
  methods: {
    getNotice: function () {
      this.$ajax({
        method: 'get',
        url: process.env.BASE_API + '/api/v2/notice_list',
        params: {
          page: this.page,
          pagesize: this.pagesize
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.total = res.data.data.total
            if (this.page !== 1) {
              this.list = this.list.concat(res.data.data.list)
            } else {
              this.list = res.data.data.list
            }
            this.$refs.my_scroller.finishPullToRefresh()
            this.$refs.my_scroller.finishInfinite(false)
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
    refresh: function () {
      console.log('refresh')
      this.page = 1
      this.getNotice()
    },
    infinite: function () {
      console.log('infinite')
      if (this.page * this.pagesize >= this.total) {
        this.$refs.my_scroller.finishInfinite(true)
      } else {
        this.page++
        this.getNotice()
      }
    }
  }
}
</script>

<style>
</style>
