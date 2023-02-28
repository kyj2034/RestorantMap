import Vue from 'vue'
import App from './App.vue'
import '@/common/Icons'
import { BootstrapVue} from 'bootstrap-vue'

import store from './store/store'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
