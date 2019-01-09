<template>
  <div id="app">
    <router-view/>

    <sui-menu :widths="4" fixed="bottom">
      <sui-menu-item><a href='#/post'>帖子</a></sui-menu-item>
      <sui-menu-item><a href='#/topic'>话题</a></sui-menu-item>
      <sui-menu-item><a href='#/notice'>消息</a></sui-menu-item>
      <sui-menu-item><a href='#/user'>我</a></sui-menu-item>
    </sui-menu>

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
    }
  }
}
</script>

<style>
#app {
  margin: 0 0 60px 0;
}
#post {
  padding: 50px 0 0 0;
}
#topic {
  padding: 50px 0 0 0;
}
</style>
