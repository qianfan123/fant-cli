import Vue from 'vue';
import Router from 'vue-router';
import Login from 'example/auth/Login.vue';
import Main from 'example/main/Main.vue'
import TestList from 'example/test/TestList.vue'
import TestAdd from 'example/test/TestAdd.vue'
import TestDtl from 'example/test/TestDtl.vue'
Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: 'testList',
          name: 'testList',
          component: TestList,
        },
        {
          path: 'testAdd',
          name: 'testAdd',
          component: TestAdd,
        },
        {
          path: 'testDtl',
          name: 'testDtl',
          component: TestDtl,
        }
      ]
    }
  ],
});
