import { createStore } from 'vuex'
import { postModule } from './postModule'

export default createStore({
  state: { likes: 12 },
  getters: {
    doubleLikes(state) {
      return state.likes * 2
    }
  },
  mutations: {
    incrementLikes(state) {
      state.likes += 1
    },
    decrementLikes(state) {
      state.likes -= 1
    }
  },
  actions: {},
  modules: {
    post: postModule
  }
})
