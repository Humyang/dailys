var GDMP = require('../../../vendors/google-diff-match-patch-js/diff_match_patch_uncompressed.js')


// 编辑器增量更新
// 使用方式
/*
import EVA from '../../serve/fontend/Obj/EditorValueAdvance.js'
this.EVA = new EVA()
self.EVA.reset() // 重置对比值

self.EVA.value = 11 //设置值
self.EVA.value = 22 //再次设置值，这时与之前的值开始进行比较

var cc = self.EVA.value //获取值

self.EVA.patch_list //获取差异值
*/
function EditorValueAdvance(){
	let old_value = ""
	let value = ""
	let patch_list = undefined

	let dmp = new GDMP.diff_match_patch()
	// this.onSet = onSet
	Object.defineProperty(this, 'value', {
		get:function(){
			return value
		},
	    set: function(text) {
			old_value = value
			value = text
			// diff_result = dmp.diff_main(old_value, value, true)
			// console.log(diff_result)
	    }
	})
	Object.defineProperty(this, 'reset', {
		value:function(){
			old_value = ""
			value = ""
			patch_list = undefined
		}
	})
	Object.defineProperty(this, 'patch_list', {
		get: function(){
			let diffs = dmp.diff_main(old_value, value, true)
			let result = dmp.patch_make(old_value, value, diffs)
			return result
		}
	})
}
export default EditorValueAdvance

// var eva = new EditorValueAdvance()
// eva.value = 1
// eva.value = 2
// eva.value = 3
// let obj = {}
// Object.defineProperty(obj,'value',{
// 	get:function(){

// 	},
// 	set:function(text){
// 		if(obj.old_value === undefined){
// 			obj.old_value = text
// 		}
// 		console.log('old_value is ',obj.old_value)
// 		obj.old_value = text
// 		console.log('current_value is',obj.current_value)
// 	}
// })
// Object.defineProperty(obj,'old_value',{
// 	value:undefined
// })
// Object.defineProperty(obj,'clearValue',{
// 	value:function(){
// 		obj.old_value = ""
// 		obj.value = ""
// 	}
// })