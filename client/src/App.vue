<script>
import TopMenu from './components/TopMenu'
import {mapState} from 'vuex'

export default {
  name: 'app',
  computed: ({
    ...mapState({
      userStore: state => state.userStore
    })
  }),
  created () {
    const userObj = JSON.parse(window.localStorage.getItem('authUser'))
    this.$store.dispatch('setUserObject', userObj)
  },
  components: {
    TopMenu
  }
}
</script>

<template>
  <div>
    <top-menu></top-menu>
    <router-view></router-view>
  </div>
</template>
<style>
  @import "./common/css/bootstrap.css";
</style>
