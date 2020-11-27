import Vue from 'vue'
import Vuex from 'vuex'

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
      ],
      deviceCategories: [
        {
          name: "category1",
          items: [
            {
              name: "item1"
            }
          ]
        },
        {
          name: "category2",
          deviceList: [
            {
              name: "item2"
            }
          ]
        },
        {
          name: "category3",
          items: [
            {
              name: "item3"
            }
          ]
        },
        {
          name: "category4",
          deviceList: [
            {
              name: "item4"
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
  }
})
