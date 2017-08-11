<script>
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState({
        chatStore: state => state.chatStore
      })
    },
    data () {
      return {
        message: null
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
            })
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
