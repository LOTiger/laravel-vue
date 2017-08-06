<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    const postDate = {
      grant_type: 'password',
      client_id: 2,
      client_secret: 'jnUUAkoL3e0Tmk5pjIzLZFm6K8s5torzxbZhDqP9',
      username: '785482918@qq.com',
      password: 'password',
      scope: ''
    }
    this.$http.post('http://localhost:8000/oauth/token', postDate)
      .then(response => {
        console.log(response)
      })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
