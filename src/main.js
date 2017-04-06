// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

import '../favicon.ico'

// import './css/fonticon/iconfont.css'
// import 'http://at.alicdn.com/t/font_6ju4lzi860qkt9.css'

Vue.use(Vuex)
let sub_module = {
  state:{
    count:123123
  },
  mutations:{
    increment2(state){
      state.count++
    }
  },
  getters:{
    doubleCount(state,getters,rootState){
      return state.count*2
    }
  },
  actions:{
    increment2({state,commit,rootState}){
      commit('increment2')
    }
  },

}
const store = new Vuex.Store({
  state: {
    count: 0,
    todos: [
    	{ id: 1,text: '...', done: true},
    	{ id: 2,text: '...', done: false},
    ]
  },
  mutations: {
    increment (state,payload) {
      state.count += payload.number
    }
  },
  getters: {
  	doneTodos: state => {
  		return state.todos.filter(todo => todo.done)
  	},
  	doneTodosCount:(state,getters)=>{
  		return getters.doneTodos.length
  	}
  },
  actions: {
  	increment ({commit},payload) {
  		setTimeout(function() {
  			commit('increment',payload)
  			setTimeout(function() {
  				commit('increment',payload)
  			}, 1000);
  		}, 1000);
  	},
  	promise ({commit},payload) {
  		return new Promise((resolve,reject)=>{
  			setTimeout(function() {
  				commit('increment',payload)
  				resolve()
  			}, 1000);
  		})
  	},
  	promise2({dispatch,commit},payload) {
  		dispatch('promise',payload).then(() => {
      		commit('increment',payload)
    	})
  	}
  },
  modules:{
    a:sub_module
  }
})
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
