<template>
	<div class="login_wrap">
		<div class="from">
			<p><input v-model="username" placeholder="账号" type="text" name=""></p>
			<p><input v-model="password" placeholder="密码" type="password" name=""></p>
			<div class="btn_wrap">
				<a 
				@click.prevent="login"
				href="#" class="btn black" >登陆</a>
				<p class="p1"><a 
				@click.prevent="regiest"
				href="">直接注册并登陆</a></p>
			</div>
		</div>
	</div>
</template>
<script >
import '../css/comman.css'
import '../css/btn.css'
import '../css/Login.css'

import * as API from '../../serve/fontend/index.js'
import * as BASE from '../../serve/fontend/base.js'

var LOGIN_CODE =  require('../../../login/lib/login.js').CODE

import co from 'co'
export default {
		data () {
		return {
			username:'',
			password:''
		}
	},
	methods:{
		login:function(){
			var self = this
			API.LOGIN.login(this.username,this.password)
			.then(function(res){
				
        		self.$root.username = BASE.getUsername()
				self.$router.push('WriteArticle')
			})
		},
		regiest:function(){
			var self = this
			co(function*(){
				let regiest_res = yield API.LOGIN.regiest(self.username,self.password)
	            // expect(regiest_res.status).toBe(true,'注册账号')

	            var login = yield API.LOGIN.login(self.username,self.password)

	            self.$router.push('WriteArticle')
			}).catch(function(){

			})
			
		}
	},
	computed:{

	},
	created:function(){
		let self = this
		API.LOGIN.login_status_check()
		.then(function(res){
			console.log(res)
			self.$router.push('WriteArticle')
		})
		.catch(function(err){
			console.log(err)
            if(err.STATUSCODE === LOGIN_CODE.LOGIN_NO_LOGIN.STATUSCODE){
				localStorage.clear()
            }
		})
	},
	ready:function(){

	}
}
</script>