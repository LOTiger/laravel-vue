<script>
  import {mapState} from 'vuex'
  import ChatUserList from './chat/ChatUserList'
  import ChatWidget from './chat/ChatWidget'
  import ChatAddWidget from './chat/ChatAddWidget'
  export default {
    components: {
      'user-list': ChatUserList,
      'chat-widget': ChatWidget,
      'add-chat': ChatAddWidget
    },
    computed: {
      ...mapState({
        chatStore: state => state.chatStore
      })
    },
    created () {
      this.$store.dispatch('setUserList')
    }
  }
</script>

<template>
  <div>
    <h2>chat</h2>
    <section class="content">
      <div class="col-md-2" id="user-list-col" >
        <user-list></user-list>
      </div>
      <div class="col-md-6" id="chat-content-wrapper">
        <div id="user-message">
          <chat-widget></chat-widget>
        </div>
        <div id="add-chat">
          <add-chat></add-chat>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
</style>
