
<script>
  import {mapState} from 'vuex'
  export default {
    computed: ({
      ...mapState({
        userStore: state => state.userStore
      })
    }),
    methods: {
      handleLogout () {
        this.$store.dispatch('clearUserObject')
        window.localStorage.removeItem('authUser')
        this.$router.push({name: 'Login'})
      }
    }
  }
</script>

<template>
  <ul class="nav nav-pills" v-if="userStore.authUser !==null && userStore.authUser.accessToken">
    <li role="presentation"><a href="#">Home</a></li>
    <li role="presentation"><router-link :to="{name: 'dashbord'}">dashbord</router-link></li>
    <li role="presentation"><router-link :to="{name: 'chat'}">chat</router-link></li>
    <li role="presentation"><a v-on:click = "handleLogout()">Logout</a></li>
  </ul>
</template>


<style>
</style>
