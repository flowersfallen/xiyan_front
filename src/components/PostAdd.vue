<template>
  <sui-segment>
    <sui-form>
      <sui-form-field>
        <label>描述</label>
        <textarea placeholder="描述" ></textarea>
      </sui-form-field>
      <sui-form-field>
        <label>图片</label>
        <input type="file" accept="image/png,image/jpg" capture="camera">
      </sui-form-field>
      <sui-button type="submit">提交</sui-button>
    </sui-form>
  </sui-segment>
</template>

<script>
export default {
  name: 'PostAdd',
  data () {
    return {
      msg: 'PostAdd'
    }
  }
}
</script>

<style>
</style>
