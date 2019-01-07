<template>
  <div id="post">
    <sui-menu fixed="top">
      <sui-menu-menu position="left">
        <sui-menu-item left>
          <a href='#/post_add'><i class="add icon"></i></a>
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
        <a href='#/detail'><sui-icon name="comment" /> 3 comments</a>
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
