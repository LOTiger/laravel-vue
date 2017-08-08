<template>
  <div class="hello">
    <form v-on:submit.prevent="handleLoginSubmit()">
      <div class="login_putin">
        <ul>
          <li><input type="text" v-model="login.email"></li><br>
          <li><input type="password" v-model="login.password" name="password"></li>
        </ul>
      </div>
      <div class="login_btn">
        <button type="submit">登陆</button>
      </div>
    </form>
  </div>
</template>

<script>
import {loginUrl, getHeader, userUrl} from '../config'
import {clientId, clientSecret} from '../env'
export default {
  data () {
    return {
      login: {
        email: '785482918@qq.com',
        password: 'password'
      }
    }
  },
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
          if (response.status === 200) {
            authUser.accessToken = response.data.access_token
            authUser.refreshToken = response.data.refresh_token
            window.localStorage.setItem('authUser', JSON.stringify(authUser))
            this.$http.get(userUrl, { headers: getHeader(), userEmail: this.login.email })
              .then(response => {
                authUser.email = response.data.email
                authUser.name = response.data.name
                window.localStorage.setItem('authUser', JSON.stringify(authUser))
                this.$router.push({name: 'dashbord'})
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.login_putin ul li input{
  margin: 0;
  width:70%;
  padding: 1em 2em 1em 5.4em;
  -webkit-border-radius:.3em;
  -moz-border-radius: .3em;
  border: 1px solid #999;
}
.login_btn{
  width:300px;
  margin:40px auto 0 auto;
}
.login_btn button{
  width:100%;
  margin:0;
  padding:.5em 0;
  -webkit-border-radius:.3em;
  -moz-border-radius: .3em;
  border:#1263be solid 1px;
  background:#1b85fd;
  color:#FFF;
  font-size:17px;
  font-weight:bolder;
  letter-spacing:1em;
}
.login_btn button:hover{
  background:#1263be;
}
</style>
