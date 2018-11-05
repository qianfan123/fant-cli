import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/iconfont/iconfont.css';
import './registerServiceWorker';
// @ts-ignore
import Filter from './cmd/Filter.js';

Vue.config.productionTip = false;
Filter.init();
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
