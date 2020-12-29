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
          name: "Ordinateurs",
          devices: [
            {
              name: "pc patou",
              ref: "XSR3",
              version: "1.0",
              phone: "12345",
              photo: "https://bulma.io/images/placeholders/1280x960.png",
              lockDays: [['2020-12-2', '2020-12-10']]
            }
          ]
        },
        {
          name: "Téléphones boulot",
          devices: [
            {
              name: "tel pat boulot",
              ref: "AMAMAMA",
              version: "1.0",
              phone: "",
              photo: "https://bulma.io/images/placeholders/1280x960.png",
              available: false,
              lockDays: [['2020-12-2', '2020-12-10']]
            }
          ]
        },
        {
          name: "Téléphones maison",
          devices: [
            {
              name: "tel pat et lulu",
              ref: "cCACACA",
              version: "1.0",
              phone: "12345",
              photo: "https://bulma.io/images/placeholders/1280x960.png",
              available: true,
              lockDays: [['2020-12-2', '2020-12-10']]
            }
          ]
        },
        {
          name: "Sac a merde de pat",
          devices: [
            {
              name: "Vibro du fiston",
              ref: "VVVVVVV",
              version: "1.0",
              phone: "",
              photo: "https://bulma.io/images/placeholders/1280x960.png",
              available: false,
              lockDays: [['2020-12-2', '2020-12-10']]
            }
          ]
        }
      ],
      users: [
        {
          identifier: 1,
          name: "toto",
          surname: "pipe",
          admin: true
        },
        {
          identifier: 2,
          name: "patoune",
          surname: "pipe",
          admin: false
        },
        {
          identifier: 3,
          name: "pipouche",
          surname: "pipe",
          admin: true
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
