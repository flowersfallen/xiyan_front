<template>
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
