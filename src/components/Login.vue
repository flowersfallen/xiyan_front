<template>
  <sui-segment>
    <sui-form>
      <sui-form-field>
        <label>邮箱</label>
        <input placeholder="email" >
      </sui-form-field>
      <sui-form-field>
        <label>密码</label>
        <input placeholder="password" >
      </sui-form-field>
      <sui-button type="submit">提交</sui-button>
    </sui-form>
  </sui-segment>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'login'
    }
  }
}
</script>

<style>
</style>
