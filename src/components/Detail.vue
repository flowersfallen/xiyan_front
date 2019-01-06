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

    <sui-segment>
      <sui-comment-group>
        <sui-comment>
          <sui-comment-avatar src="https://semantic-ui-vue.github.io/static/images/avatar/small/matt.jpg" />
          <sui-comment-content>
            <a is="sui-comment-author">姓名</a>
            <sui-comment-metadata>
              <div>Today at 5:42PM</div>
            </sui-comment-metadata>
            <sui-comment-text>评论内容</sui-comment-text>
          </sui-comment-content>
        </sui-comment>

        <sui-comment>
          <sui-comment-avatar src="https://semantic-ui-vue.github.io/static/images/avatar/small/matt.jpg" />
          <sui-comment-content>
            <a is="sui-comment-author">姓名</a>
            <sui-comment-metadata>
              <div>Today at 5:42PM</div>
            </sui-comment-metadata>
            <sui-comment-text>评论内容</sui-comment-text>
          </sui-comment-content>
        </sui-comment>

        <sui-comment>
          <sui-comment-avatar src="https://semantic-ui-vue.github.io/static/images/avatar/small/matt.jpg" />
          <sui-comment-content>
            <a is="sui-comment-author">姓名</a>
            <sui-comment-metadata>
              <div>Today at 5:42PM</div>
            </sui-comment-metadata>
            <sui-comment-text>评论内容</sui-comment-text>
          </sui-comment-content>
        </sui-comment>
      </sui-comment-group>

      <div class="ui left icon action input fluid">
        <i class="comments icon"></i>
        <input type="text" placeholder="评论">
        <div class="ui blue submit button">发布</div>
      </div>
    </sui-segment>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      msg: 'detail'
    }
  }
}
</script>

<style>
</style>
