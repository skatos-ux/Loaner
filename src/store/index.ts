import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './modules/auth'
import { cart } from "@/store/modules/cart";
import { devices} from "@/store/modules/devices";

import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web: {
      filters: [
        {
          name: "nom",
          model: "searchByName",
          auto: true
        },
        {
          name: "référence",
          model: "searchByRef",
          auto: false
        },
        {
          name: "catégorie",
          model: "searchByCategory",
          auto: false
        }
      ]
    },

  },
  mutations: {
    clearStore(state: any) {

      state.cart.items = []

      state.auth.user.id = null
      state.auth.user.firstName = null
      state.auth.user.lastName = null
      state.auth.user.email = null
      state.auth.user.admin = false
      state.auth.user.token = null
      state.auth.user.temporaryPassword = null
      state.auth.user.logged = false
    }
  },
  actions: {
    logout(context: any) {
      context.commit('clearStore')
    }
  },
  modules: {
    auth,
    cart,
    devices,
  },
  plugins: [createPersistedState({})]
})
