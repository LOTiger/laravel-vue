<script>
  import {mapState} from 'vuex'
  import Pusher from 'pusher-js'
  export default {
    created () {
      this.pusher = new Pusher('4bc37cf2c85e173191c4', {
        encrypted: true,
        cluster: 'ap1'
      })
      let that = this
      this.channel = this.pusher.subscribe('chat_channel')
      this.channel.bind('chat_saved', function (data) {
        that.$emit('incoming_chat', data)
      })
      this.$on('incoming_chat', function (chatMessage) {
        this.incomingChat(chatMessage)
      })
    },
    computed: {
      ...mapState({
        chatStore: state => state.chatStore,
        userStore: state => state.userStore
      })
    },
    data () {
      return {
        message: null,
        pusher: null,
        channel: null
      }
    },
    methods: {
      handleAddChat () {
        if (this.message !== null) {
          let postData = {
            'receiver_id': this.chatStore.currentChatUser.id,
            'chat': this.message
          }

          this.$store.dispatch('addNewChatToConversation', postData)
            .then(response => {
              this.message = null
              let element = document.getElementById('add-chat')
              element.scrollIntoView(false)
            })
        }
      },
      incomingChat (chatMessage) {
        if (this.chatStore.currentChatUser.id === chatMessage.message.sender_id) {
          if (this.userStore.authUser.email === chatMessage.message.receiver.email) {
            this.$store.dispatch('newIncomingChat', chatMessage.message)
              .then(res => {
                let element = document.getElementById('add-chat')
                element.scrollIntoView(false)
              })
          } else {
            console.log('Message for some other user')
          }
        }
      }
    }
  }
</script>

<template>
  <form v-on:submit.prevent = "handleAddChat()">
    <div class="form-group">
      <input type="text" placeholder="input your message" class="form-control" v-model="message"/>
    </div>

  </form>
</template>

<style>
</style>
