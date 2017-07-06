var SwitchF = function(s){
	// var s=Object.assign({
	// 	f1:function(){},
	// 	f2:function(){}
	// },settings);
	var flag = false
	return function(){
		if(!flag){
			console.log(1)
			s[0].call()
		}else{
			console.log(2)
			s[1].call()
		}
		flag=!flag
	}
}
export default SwitchF