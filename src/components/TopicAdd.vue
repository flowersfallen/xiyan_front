<template>
  <sui-segment>
    <sui-form>
      <sui-form-field>
        <label>标题</label>
        <input placeholder="标题" >
      </sui-form-field>
      <sui-form-field>
        <label>描述</label>
        <textarea placeholder="描述" ></textarea>
      </sui-form-field>
      <sui-button type="submit">提交</sui-button>
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
