<template>
  <div id="post">
    <sui-menu fixed="top">
      <sui-menu-menu position="left">
        <sui-menu-item left>
          <a href='#/post_add'><i class="add icon"></i></a>
        </sui-menu-item>
        <sui-menu-item left>
          <div>{{ name }}</div>
        </sui-menu-item>
      </sui-menu-menu>

      <sui-menu-menu position="right">
        <sui-menu-item right>
          <div class="ui right action input">
            <input type="text" placeholder="搜帖子">
            <sui-button icon="search" attached="right"/>
          </div>
        </sui-menu-item>
      </sui-menu-menu>
    </sui-menu>

    <div v-for="item in list" v-bind:item="item" v-bind:key="item.id">
    <sui-card class="fluid">
      <sui-card-content>
        <sui-image v-if="item.avatar" v-bind:src="item.avatar" shape="circular" size="mini"/>
        {{ item.name }}
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
        <a v-bind:href="'#/detail?post_id=' + item.id"><sui-icon name="comment" /> {{ item.comment}} comments</a>
      </sui-card-content>
    </sui-card>

    <sui-divider />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.$ajax({
      method: 'get',
      url: process.env.BASE_API + '/api/v2/post_list',
      params: {
        keyword: ''
      }
    }).then(res => {
      if (res.status === 200) {
        if (res.data.state) {
          this.list = res.data.data.list
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
  computed: {
    name () {
      return this.$store.state.name
    }
  }
}
</script>

<style>
</style>
