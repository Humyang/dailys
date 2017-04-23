var GDMP = require('../../../vendors/google-diff-match-patch-js/diff_match_patch_uncompressed.js')

function EditorValueAdvance(){
	let old_value = ""
	let value = ""
	let diff_result = undefined

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
			diff_result = undefined
		}
	})
	Object.defineProperty(this, 'diff_result', {
		get: function(){
			let diffs = dmp.diff_main(old_value, value, false)
			console.log(diffs)
			// console.log(dmp.patch_apply(patches, old_value))
			return diffs
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