<template>
  <div>
    <sui-card  class="fluid">
      <sui-card-content>
        <sui-image src="https://semantic-ui.com/images/avatar2/large/kristy.png" shape="circular" size="mini"/>
        Elliot
        <sui-card-meta slot="right">14h</sui-card-meta>
      </sui-card-content>
      <sui-image src="https://semantic-ui.com/images/avatar2/large/kristy.png" />
      <sui-card-content>
        <span slot="right">
          <sui-icon name="heart outline" /> 17 likes
        </span>
        <sui-icon name="comment" /> 3 comments
      </sui-card-content>
      <sui-card-content extra>
        <sui-input placeholder="Add Comment" icon="heart outline" icon-position="left" transparent/>
      </sui-card-content>
    </sui-card>

    <sui-divider />

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '火柴盒'
    }
  }
}
</script>

<style>
</style>
