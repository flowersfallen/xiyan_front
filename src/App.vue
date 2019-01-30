<template>
  <div id="app">
    <router-view/>

    <sui-menu :widths="4" fixed="bottom">
      <sui-menu-item><a href='#/post'>帖子</a></sui-menu-item>
      <sui-menu-item><a href='#/topic'>话题</a></sui-menu-item>
      <sui-menu-item><a href='#/notice'>消息</a></sui-menu-item>
      <sui-menu-item><a href='#/user'>我</a></sui-menu-item>
    </sui-menu>

    <div style="text-align:center"><a href="http://www.miitbeian.gov.cn/">鄂ICP备19002523号</a></div>

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
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  created () {
    this.getJsSdk()
  },
  computed: {
    error () {
      return this.$store.state.error
    },
    open () {
      return this.$store.state.open
    }
  },
  methods: {
    toggle: function () {
      if (this.$store.state.open) {
        this.$store.dispatch('delError')
      } else {
        this.$store.dispatch('setError', '')
      }
    },
    getJsSdk: function () {
      this.$ajax({
        method: 'get',
        url: process.env.BASE_API + '/api/jssdk',
        params: {
          'url': location.href.split('#')[0]
        }
      }).then(res => {
        if (res.status === 200) {
          this.$wx.config(res.data)
          this.$wx.ready(() => {
            this.$wx.updateAppMessageShareData({
              title: '蓝色学者和戏言跟班',
              desc: '蓝色学者和戏言跟班',
              link: 'www.xiyan.ink',
              imgUrl: 'http://www.xiyan.ink/storage/20190124/Qg3WMjodcfVA4Hoo6DRU5vJGaYkFepHL7OMK4jl9.jpeg.small.png',
              success: function () {
              }
            })
            this.$wx.updateTimelineShareData({
              title: '蓝色学者和戏言跟班',
              link: 'www.xiyan.ink',
              imgUrl: 'http://www.xiyan.ink/storage/20190124/Qg3WMjodcfVA4Hoo6DRU5vJGaYkFepHL7OMK4jl9.jpeg.small.png',
              success: function () {
              }
            })
            this.$wx.onMenuShareTimeline({
              title: '蓝色学者和戏言跟班',
              link: 'www.xiyan.ink',
              imgUrl: 'http://www.xiyan.ink/storage/20190124/Qg3WMjodcfVA4Hoo6DRU5vJGaYkFepHL7OMK4jl9.jpeg.small.png',
              success: function () {
              }
            })
            this.$wx.onMenuShareAppMessage({
              title: '蓝色学者和戏言跟班',
              desc: '蓝色学者和戏言跟班',
              link: 'www.xiyan.ink',
              imgUrl: 'http://www.xiyan.ink/storage/20190124/Qg3WMjodcfVA4Hoo6DRU5vJGaYkFepHL7OMK4jl9.jpeg.small.png',
              type: '',
              dataUrl: '',
              success: function () {
              }
            })
          })
          this.$wx.error(function (res) {
            console.log('wx.error' + res)
          })
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
#app {
  margin: 0 0 60px 0;
}
</style>
