<template>
  <sui-segment>
    <sui-form>
      <sui-form-field>
        <sui-dropdown placeholder="选择话题" selection :options="options" v-model="current"/>
      </sui-form-field>
      <sui-form-field>
        <textarea placeholder="描述" ></textarea>
      </sui-form-field>
      <sui-form-field>
        <input type="file" accept="image/png,image/jpg" capture="camera">
      </sui-form-field>
      <sui-button type="submit" class="fluid">提交</sui-button>
    </sui-form>
  </sui-segment>
</template>

<script>
export default {
  name: 'PostAdd',
  data () {
    return {
      msg: 'PostAdd',
      current: null,
      options: [{
        text: 'Male',
        value: 1
      }, {
        text: 'Female',
        value: 2
      }]
    }
  }
}
</script>

<style>
</style>
