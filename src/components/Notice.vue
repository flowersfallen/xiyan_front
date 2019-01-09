<template>
  <sui-segment>
    <sui-feed>
      <sui-feed-event>
        <sui-feed-label>
          <img src="https://semantic-ui-vue.github.io/static/images/avatar/small/elliot.jpg"/>
        </sui-feed-label>
        <sui-feed-content>
          <sui-feed-summary>
            <sui-feed-user>Elliot Fu</sui-feed-user> added you as a friend
            <sui-feed-date>1 Hour Ago</sui-feed-date>
          </sui-feed-summary>
        </sui-feed-content>
      </sui-feed-event>
    </sui-feed>
  </sui-segment>
</template>

<script>
export default {
  name: 'Notice',
  data () {
    return {
      msg: 'notice'
    }
  }
}
</script>

<style>
</style>
