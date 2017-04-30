/*
封装的目的是什么？

1. 提取重复的代码。
2. 保持代码整洁。

拖动事件有哪些重复代码？

1. 拖动处理：hover （参数传入回调方法）
2. 拖动处理：结束 （参数传入回调方法）
3. 拖动处理：onDrop 响应 （参数传入回调方法）

因为拖动处理是 DOM 事件，需要绑定元素，所以要传入元素 Id。

*/
var dndUpload = function(element,options){
	
	// var elementId = elementId
	// var element = document.GetElementById(elementId)


	// var options = Object.assign({
	// 	onSuccess:function(img_url){
	// 		//上传成功,返回图片字符串
	// 	}
	// },options)
	
	// onSuccess

	/* events fired on the draggable target */
	element.addEventListener("drag", function( event ) {
		console.log(event.DataTransfer.files)
	}, false);





	element.addEventListener("dragstart", function( event ) {
	  // store a ref. on the dragged elem
	  // dragged = event.target;
	  // make it half transparent
	  // event.target.style.opacity = .5;
	}, false);

	element.addEventListener("dragend", function( event ) {
	  // reset the transparency
	  // event.target.style.opacity = "";
	}, false);

	/* events fired on the drop targets */
	element.addEventListener("dragover", function( event ) {
	  // prevent default to allow drop
	  event.preventDefault();
	}, false);

	element.addEventListener("dragenter", function( event ) {
	  // highlight potential drop target when the draggable element enters it
	  // if ( event.target.className == "dropzone" ) {
	  //     event.target.style.background = "purple";
	  // }

	}, false);

	element.addEventListener("dragleave", function( event ) {
	  // reset background of potential drop target when the draggable element leaves it
	  // if ( event.target.className == "dropzone" ) {
	  //     event.target.style.background = "";
	  // }

	}, false);

	element.addEventListener("drop", function( event ) {
	  // prevent default action (open as link for some elements)
	  event.preventDefault();
	  // move dragged elem to the selected drop target
	  // if ( event.target.className == "dropzone" ) {
	  //     event.target.style.background = "";
	  //     dragged.parentNode.removeChild( dragged );
	  //     event.target.appendChild( dragged );
	  // }

	}, false);
}
// dndUpload.prototype.onDrop = function(){

// }
// dndUpload.prototype.onDragOver = function(){

// }
// dndUpload.prototype.startUpload = function(){

// }
// dndUpload.prototype.uploadSuccess = function(){

// }
// dndUpload.prototype.uploadEnd = function(){

// }
