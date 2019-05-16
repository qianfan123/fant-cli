import Vue from 'vue'
import Router from 'vue-router'
import Login from 'pages/auth/Login.vue'
import Main from 'pages/main/Main.vue'
import ProjectList from 'pages/example/ProjectList'
import ProjectAdd from 'pages/example/ProjectAdd'
import ProjectDtl from 'pages/example/ProjectDtl'
import TestComponent from 'pages/testcomponent/TestComponent.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '/',
      redirect: location.pathname.indexOf('example.html') > 0 ? '/testComponent' : '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/projectList',
          name: 'projectList',
          component: ProjectList,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/projectAdd',
          name: 'projectAdd',
          component: ProjectAdd
        },
        {
          path: '/projectDtl',
          name: 'projectDtl',
          component: ProjectDtl
        }
      ]
    },
    {
      path: '/testComponent',
      name: 'testComponent',
      component: TestComponent
    }
  ]
})
