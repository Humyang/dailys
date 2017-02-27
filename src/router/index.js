import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import WriteArticle from '../components/WriteArticle'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {   
        path:'/WriteArticle',
        name:'WriteArticle',
        component:WriteArticle
    }
  ]
})
