import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import WriteArticle from '../components/WriteArticle'
import Login from '../components/Login'
import deploy from '../components/deploy'
Vue.use(Router)
export default new Router({
  mode:"history",
  routes: [
    {
      path: '/papers',
      name: 'WriteArticle',
      component: WriteArticle
    },
      {   
        path:'/papers',
        name:'WriteArticle',
        component:WriteArticle
    },
    {   
        path:'/papers/:floderid',
        name:'WriteArticle',
        component:WriteArticle
    },
    {   
        path:'/papers/:floderid/article/:articleid',
        name:'WriteArticle2',
        component:WriteArticle
    },
    {   
        path:'/Login',
        name:'Login',
        component:Login
    }
    // ,
    // {   
    //     path:'/deploy',
    //     name:'deploy',
    //     component:deploy
    // }
  ]
})
