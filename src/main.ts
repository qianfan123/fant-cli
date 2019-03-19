import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/iconfont/iconfont.css'
import './registerServiceWorker'
import fant3 from 'fant3'

import Filter from './cmd/Filter.js'

import i18n from './locale/Locale.js'

Vue.use(fant3)
Vue.config.productionTip = false
Filter.init()
new Vue({
  i18n,
  render: (h) => h(App),
  router
}).$mount('#app')
