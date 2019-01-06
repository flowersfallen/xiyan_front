<template>
  <div>
    <sui-card  class="fluid">
      <sui-card-content>
        <sui-image
          src="https://semantic-ui.com/images/avatar2/large/kristy.png"
          shape="circular"
          size="mini"
        />
        Elliot
        <sui-card-meta slot="right">14h</sui-card-meta>
      </sui-card-content>
      <sui-image src="https://semantic-ui.com/images/avatar2/large/kristy.png" />
      <sui-card-content>
        <sui-card-description>想什么在呢</sui-card-description>
      </sui-card-content>
      <sui-card-content>
        <span slot="right">
          <sui-icon name="heart outline" /> 17 likes
        </span>
        <sui-icon name="comment" /> 3 comments
      </sui-card-content>
    </sui-card>

    <sui-divider />

    <sui-card  class="fluid">
      <sui-card-content>
        <sui-image
          src="https://semantic-ui.com/images/avatar2/large/kristy.png"
          shape="circular"
          size="mini"
        />
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
    </sui-card>

    <sui-divider />

    <sui-card  class="fluid">
      <sui-card-content>
        <sui-image
          src="https://semantic-ui.com/images/avatar2/large/kristy.png"
          shape="circular"
          size="mini"
        />
        Elliot
        <sui-card-meta slot="right">14h</sui-card-meta>
      </sui-card-content>
      <sui-card-content>
        <sui-card-description>想什么在呢</sui-card-description>
      </sui-card-content>
      <sui-card-content>
        <span slot="right">
          <sui-icon name="heart outline" /> 17 likes
        </span>
        <sui-icon name="comment" /> 3 comments
      </sui-card-content>
    </sui-card>

  </div>
</template>

<script>
export default {
  name: 'Post',
  data () {
    return {
      msg: 'post'
    }
  }
}
</script>

<style>
</style>
