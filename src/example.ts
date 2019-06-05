import Vue from 'vue'
import Example from 'pages/example/Example.vue'
import router from './router'
import './assets/iconfont/iconfont.css'
import './registerServiceWorker'
import Fant from 'fant3'
import 'fant3/lib/theme-chalk/index.css';
import Filter from './cmd/Filter.js'
import Directive from './cmd/directive.js'
import './assets/styles/index.scss'
import i18n from './locale/Locale.js'
import store from './store/index'
Vue.use(Fant)
Vue.config.productionTip = false
Filter.init()
Directive.init()
new Vue({
  store,
  i18n,
  render: (h) => h(Example),
  router
}).$mount('#example')
