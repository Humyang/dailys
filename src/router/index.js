import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import WriteArticle from '../components/WriteArticle'
import Login from '../components/Login'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {   
        path:'/WriteArticle',
        name:'WriteArticle',
        component:WriteArticle
    },
    {   
        path:'/Login',
        name:'Login',
        component:Login
    }
  ]
})
