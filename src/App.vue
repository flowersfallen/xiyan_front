<template>
  <div id="app">
    <router-view/>

    <sui-menu :widths="4" fixed="bottom">
      <sui-menu-item><a href='#/post'>帖子</a></sui-menu-item>
      <sui-menu-item><a href='#/topic'>话题</a></sui-menu-item>
      <sui-menu-item><a href='#/notice'>消息</a></sui-menu-item>
      <sui-menu-item><a href='#/user'>我</a></sui-menu-item>
    </sui-menu>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  margin: 0 0 60px 0;
}
#post {
  padding: 40px 0 0 0;
}
#topic {
  padding: 40px 0 0 0;
}
</style>
