import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/iconfont/iconfont.css';
import './registerServiceWorker';

import Filter from './cmd/Filter.js';

import i18n from './locale/Locale.js';
Vue.config.productionTip = false;
Filter.init();
new Vue({
  i18n,
  render: (h) => h(App),
  router,
}).$mount('#app');
