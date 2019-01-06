<template>
  <div id="app">
    <sui-menu fixed="top">
      <sui-menu-menu position="left">
        <sui-menu-item left>
          <a href='#/post'><i class="add icon"></i></a>
        </sui-menu-item>
      </sui-menu-menu>

      <sui-menu-menu position="right">
        <sui-menu-item right>
          <a href='#/post'><i class="search icon"></i></a>
        </sui-menu-item>
      </sui-menu-menu>
    </sui-menu>

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
  padding: 40px 0 0 0;
  margin: 0 0 60px 0;
}
</style>
