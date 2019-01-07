<template>
  <sui-segment>
    <sui-form>
      <sui-form-field>
        <input placeholder="话题" >
      </sui-form-field>
      <sui-form-field>
        <textarea placeholder="描述" ></textarea>
      </sui-form-field>
      <sui-button type="submit" class="fluid">提交</sui-button>
    </sui-form>
  </sui-segment>
</template>

<script>
export default {
  name: 'TopicAdd',
  data () {
    return {
      msg: 'TopicAdd'
    }
  }
}
</script>

<style>
</style>
