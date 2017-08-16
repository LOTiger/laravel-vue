<script>
import {loginUrl, getHeader, userUrl} from '../config'
import {clientId, clientSecret} from '../env'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      login: {
        email: '785482918@qq.com',
        password: 'password'
      }
    }
  },
  computed: ({
    ...mapState({
      userStore: state => state.userStore
    })
  }),
  methods: {
    handleLoginSubmit () {
      console.log(loginUrl)
      const postData = {
        grant_type: 'password',
        client_id: clientId,
        client_secret: clientSecret,
        username: this.login.email,
        password: this.login.password,
        scope: ''
      }
      const authUser = {}
      this.$http.post(loginUrl, postData)
        .then(response => {
          console.log('get return:', response)
          if (response.status === 200) {
            authUser.accessToken = response.data.access_token
            authUser.refreshToken = response.data.refresh_token
            window.localStorage.setItem('authUser', JSON.stringify(authUser))
            this.$http.get(userUrl, { headers: getHeader(), userEmail: this.login.email })
              .then(response => {
                console.log('userResponse:', response)
                authUser.email = response.data.email
                authUser.name = response.data.name
                window.localStorage.setItem('authUser', JSON.stringify(authUser))
                this.$router.push({name: 'dashbord'})
                this.$store.dispatch('setUserObject', authUser)
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<template>
  <div>
    <form v-on:submit.prevent="handleLoginSubmit()">
      <div class="form-group">
        <div class="col-lg-8">
          <label for="exampleInputEmail1">Email address</label>
          <input type="text"
                 class="form-control"
                 id="exampleInputEmail1"
                 placeholder="Email"
                 v-model="login.email">
        </div>
      </div>
      <div class="form-group">
        <div class="col-lg-8">
          <label for="exampleInputPassword1">Password</label>
          <input type="password"
                 class="form-control"
                 id="exampleInputPassword1"
                 placeholder="Password"
                 v-model="login.password">
          </div>
      </div>
      <div class="form-group">
      <div class="col-lg-4">
        <button type="submit" class="btn btn-default">Login</button>
      </div></div>
    </form>
  </div>
</template>

<style>
</style>

