<template>
  <div>
    <sui-card  class="fluid">
      <sui-image src="https://semantic-ui-vue.github.io/static/images/avatar/large/kristy.png" />
      <sui-card-content>
        <sui-card-header>Kristy</sui-card-header>
        <sui-card-meta>Joined in 2013</sui-card-meta>
        <sui-card-description>Kristy is an art director living in New York.</sui-card-description>
      </sui-card-content>
      <sui-card-content extra>
        <sui-container text-align="center">
            <sui-button-group>
              <sui-button basic>帖子</sui-button>
              <sui-button basic>话题</sui-button>
              <sui-button basic>关注</sui-button>
            </sui-button-group>
          </sui-container>
      </sui-card-content>
    </sui-card>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      msg: 'user'
    }
  }
}
</script>

<style>
</style>
