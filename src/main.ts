import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/iconfont/iconfont.css'
import './registerServiceWorker'
import Fant from 'fant3'
import 'fant3/lib/theme-chalk/index.css';
import Filter from './cmd/Filter.js'

import i18n from './locale/Locale.js'

Vue.use(Fant)
Vue.config.productionTip = false
Filter.init()
new Vue({
  i18n,
  render: (h) => h(App),
  router
}).$mount('#app')
