import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import WriteArticle from '../components/WriteArticle'
import Login from '../components/Login'
import deploy from '../components/deploy'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'WriteArticle',
      component: WriteArticle
    },
      {   
        path:'/WriteArticle',
        name:'WriteArticle',
        component:WriteArticle
    },
    {   
        path:'/WriteArticle/:floderid',
        name:'WriteArticle',
        component:WriteArticle
    },
    {   
        path:'/WriteArticle/:floderid/article/:articleid',
        name:'WriteArticle2',
        component:WriteArticle
    },
    {   
        path:'/Login',
        name:'Login',
        component:Login
    },
    {   
        path:'/deploy',
        name:'deploy',
        component:deploy
    }
  ]
})
