<template>
	<div>{{countPlusLocalState}},{{count}},{{countAlias}}
	<h1>getter</h1>
	doneTodos:{{doneTodos}}
	<br/>
	doneTodosCount:{{doneTodosCount}}
	<br/>
	<a @click.prevent="addone" href="">mutations add one</a>
  <br/>
  sub_module{{submodule.count}}
  <a @click.prevent="sub_addone" href="">sub module add one</a>
	</div>
</template>

<script>
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
export default {
  data () {
    return {localCount: 50}
  },
  methods:{
    sub_addone(){
      this.increment2()
    },
  	addone(){
  		//直接 commit Mutation
  		// this.$store.commit('increment',{
  		// 	number:12
  		// })
  		// this.$store.commit({
  		// 	type:'increment',
  		// 	number:14
  		// })
  		// mapMutations化
  		// this.increment({
  		// 	number:15
  		// })

  		// 分发 store
  		// this.$store.dispatch('increment',{number:22})
  		// mapActions 化
  		// this.increment({number:40})
  		// promise ations
  		this.promise2({number:33})
  	},
  	// ...mapMutations([
  	// 		'increment'
  	// 	]),
  	...mapActions(['increment','promise2','increment2'])
  },
  computed: {
  	
  	// doneTodos () { 
  	// 	return this.$store.getters.doneTodos
  	// },
  	...mapGetters(['doneTodos','doneTodosCount']),
  	...mapState({
	    count: state => state.count,
      submodule:state=>state.a,
	    countAlias: 'count',
	    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
	    countPlusLocalState (state) {
	      return state.count + this.localCount
	    }
  	})
  } 
}
</script>
