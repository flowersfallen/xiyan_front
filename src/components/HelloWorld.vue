<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>虽然你我会下落不明，你知道我曾为你动过情。</p>
    <ul>
      <li>
        <a href = '#/index'>首页</a>
      </li>
      <li>
        <a href = '#/list'>列表</a>
      </li>
      <li>
        <a href = '#/show'>详情</a>
      </li>
    </ul>
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
