<template>
  <div>
    <sui-menu fixed="top">
      <sui-menu-menu position="left">
        <sui-menu-item left>
          <a v-bind:href="'#/post_add?topic_id=' + topic_id"><i class="add icon"></i></a>
        </sui-menu-item>
        <sui-menu-item left>
          {{topic_title}}
        </sui-menu-item>
      </sui-menu-menu>

      <sui-menu-menu position="right">
        <sui-menu-item right>
          <div class="ui right action input">
            <input type="text" v-model="keyword" placeholder="搜帖子">
            <sui-button icon="search" attached="right" v-on:click='search'/>
          </div>
        </sui-menu-item>
      </sui-menu-menu>
    </sui-menu>

    <scroller style="padding-top:50px" :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">
      <div v-for="item in list" v-bind:item="item" v-bind:key="item.id">
        <sui-card class="fluid">
          <sui-card-content>
            <a v-bind:href="'#/user?user_id=' + item.created_by">
              <sui-image v-if="item.avatar" v-bind:src="item.avatar" shape="circular" size="mini"/>
            </a>
            <a v-bind:href="'#/user?user_id=' + item.created_by">{{ item.name }}</a>
            <sui-card-meta slot="right" style="margin-top:8px">{{ item.created_at }}</sui-card-meta>
          </sui-card-content>
          <sui-image v-if="item.attachment" v-bind:src="item.attachment" />
          <sui-card-content>
            <sui-card-description>{{ item.content }}</sui-card-description>
          </sui-card-content>
          <sui-card-content>
            <span slot="right">
              <a v-bind:href="'#/detail?post_id=' + item.id"><sui-icon name="heart outline" /> {{ item.digg }} likes </a>
            </span>
            <a v-bind:href="'#/detail?post_id=' + item.id"><sui-icon name="comment outline" /> {{ item.comment}} comments</a>
          </sui-card-content>
        </sui-card>
        <sui-divider />
      </div>
    </scroller>
  </div>
</template>

<script>
export default {
  name: 'Post',
  data () {
    return {
      list: [],
      total: 0,
      keyword: '',
      topic_id: '',
      topic_title: '',
      page: 1,
      pagesize: 5
    }
  },
  created () {
    var topicId = this.$route.query.topic_id
    if (topicId) {
      this.topic_id = topicId
    }
    this.getPost()
  },
  methods: {
    getPost: function () {
      this.$ajax({
        method: 'get',
        url: process.env.BASE_API + '/api/v2/post_list',
        params: {
          keyword: this.keyword,
          page: this.page,
          pagesize: this.pagesize,
          topic_id: this.topic_id
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.state) {
            this.total = res.data.data.total
            this.topic_title = res.data.data.topic_title ? res.data.data.topic_title : '最新帖子'
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
    search: function () {
      this.page = 1
      this.getPost()
    },
    refresh: function () {
      console.log('refresh')
      this.page = 1
      this.getPost()
    },
    infinite: function () {
      console.log('infinite')
      if (this.page * this.pagesize >= this.total) {
        this.$refs.my_scroller.finishInfinite(true)
      } else {
        this.page++
        this.getPost()
      }
    }
  }
}
</script>

<style>
</style>
