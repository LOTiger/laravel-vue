import {userListUrl,
  getUserConversationUrl,
  saveChatMessageUrl
} from './../../config'
import { getHeader } from '../../config'
import axios from 'axios'
const state = {
  userList: {},
  currentChatUser: null,
  conversation: null
}

const mutations = {
  SET_USER_LIST (state, userList) {
    state.userList = userList
  },
  SET_CURRENT_CHAT_USER (state, user) {
    state.currentChatUser = user
  },
  SET_CONVERSATION (state, conversation) {
    state.conversation = conversation
  },
  ADD_CHAT_TO_CONVERSATION (state, chat) {
    state.conversation.push(chat)
  }
}

const actions = {
  setUserList: ({commit}, userList) => {
    return axios.get(userListUrl, {headers: getHeader()})
      .then(response => {
        if (response.status === 200) {
          commit('SET_USER_LIST', response.data.data)
          return response.data.data
        }
      })
  },
  setCurrentChatUser: ({commit}, user) => {
    commit('SET_CURRENT_CHAT_USER', user)
    let postData = {id: user.id}
    return axios.post(getUserConversationUrl, postData, {headers: getHeader()})
      .then(response => {
        commit('SET_CONVERSATION', response.data.data)
      })
  },
  addNewChatToConversation: ({commit}, postData) => {
    return axios.post(saveChatMessageUrl, postData, {headers: getHeader()})
      .then(response => {
        console.log('ready to add new conversation:', response.data.data)
        commit('ADD_CHAT_TO_CONVERSATION', response.data.data)
      })
  }
}

export default {
  state, mutations, actions
}
