import Vue from 'vue'
import Vuelidate from 'vuelidate'

// Vuelidate
Vue.use(Vuelidate)

import App from './App.vue'
import axios, {AxiosStatic} from "axios";



import router from './router'
import store from './store'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(fas)

// Axios
axios.defaults.baseURL = 'http://localhost:3000/api';
Vue.prototype.$api = axios;
declare module 'vue/types/vue' {
  interface Vue {
    $api: AxiosStatic;
  }
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
