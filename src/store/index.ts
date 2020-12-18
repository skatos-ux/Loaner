import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './modules/auth'
import { cart } from "@/store/modules/cart";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web: {
      filters: [
        {
          name: "filtre1"
        },
        {
          name: "filtre2"
        }
      ]
    },
    db: {
      deviceCategories: [
        {
          name: "category1",
          devices: [
            {
              name: "item1",
              ref: "a",
              version: "1.0",
              sim: true,
              photo: "https://bulma.io/images/placeholders/1280x960.png",
              available: true
            }
          ]
        },
        {
          name: "category2",
          devices: [
            {
              name: "item2",
              ref: "b",
              version: "1.0",
              sim: true,
              photo: "https://bulma.io/images/placeholders/1280x960.png",
              available: false
            }
          ]
        },
        {
          name: "category3",
          devices: [
            {
              name: "item3",
              ref: "c",
              version: "1.0",
              sim: true,
              photo: "https://bulma.io/images/placeholders/1280x960.png",
              available: true
            }
          ]
        },
        {
          name: "category4",
          devices: [
            {
              name: "item4",
              ref: "d",
              version: "1.0",
              sim: true,
              photo: "https://bulma.io/images/placeholders/1280x960.png",
              available: false
            }
          ]
        }
      ]
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    cart
  }
})