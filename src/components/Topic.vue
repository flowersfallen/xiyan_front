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
            <input type="text" placeholder="搜帖子">
            <sui-button icon="search" attached="right"/>
          </div>
        </sui-menu-item>
      </sui-menu-menu>
    </sui-menu>

    <sui-segment>
      <sui-list divided relaxed>
        <sui-list-item>
          <sui-list-content>
            <a is="sui-list-header">话题1</a>
            <a is="sui-list-description">Updated 10 mins ago</a>
          </sui-list-content>
        </sui-list-item>

        <sui-list-item>
          <sui-list-content>
            <a is="sui-list-header">话题1</a>
            <a is="sui-list-description">Updated 10 mins ago</a>
          </sui-list-content>
        </sui-list-item>

        <sui-list-item>
          <sui-list-content>
            <a is="sui-list-header">话题1</a>
            <a is="sui-list-description">Updated 10 mins ago</a>
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
      msg: 'topic'
    }
  }
}
</script>

<style>
</style>
