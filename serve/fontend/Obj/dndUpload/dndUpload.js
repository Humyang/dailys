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

import Upload from '../upload/Upload.js'
function blobToFile(theBlob, fileName){
	//A Blob() is almost a File() - it's just missing the two properties below which we will add
	theBlob.lastModifiedDate = new Date();
	theBlob.name = fileName;
	return theBlob;
}
var dndUpload = function (element, options) {

	var options = Object.assign({
		onSuccess: undefined,
		onError: undefined,
		onComplete: undefined,
		onProcess: undefined,
		serve_url: undefined
	}, options)
	// options.serve_url = 'http://localhost:3000/upload' || 
	var upload = new Upload({
		serve_url: options.serve_url, onSuccess: function (res) {
			// console.log(res)
			options.onSuccess(JSON.parse(res.target.responseText))
			// var obj = JSON.parse(res.target.responseText)
			// console.log(obj)
		}
	})

	/* events fired on the draggable target */
	element.addEventListener("drag", function (event) {
		// console.log(event.DataTransfer.files)
		// console.log(123)
		// upload.start(event.DataTransfer.files[0])
	}, false);





	element.addEventListener("dragstart", function (event) {
		// store a ref. on the dragged elem
		// dragged = event.target;
		// make it half transparent
		// event.target.style.opacity = .5;
		console.log(1233)
	}, false);

	element.addEventListener("dragend", function (event) {
		// reset the transparency
		// event.target.style.opacity = "";
	}, false);

	/* events fired on the drop targets */
	element.addEventListener("dragover", function (event) {
		// prevent default to allow drop
		event.preventDefault();
		console.log(333)
	}, false);

	element.addEventListener("dragenter", function (event) {
		// highlight potential drop target when the draggable element enters it
		// if ( event.target.className == "dropzone" ) {
		//     event.target.style.background = "purple";
		// }

	}, false);

	element.addEventListener("dragleave", function (event) {
		// reset background of potential drop target when the draggable element leaves it
		// if ( event.target.className == "dropzone" ) {
		//     event.target.style.background = "";
		// }

	}, false);

	element.addEventListener("drop", function (event) {

		upload.start(event.dataTransfer.files[0])

		// prevent default action (open as link for some elements)
		event.preventDefault();
		// move dragged elem to the selected drop target
		// if ( event.target.className == "dropzone" ) {
		//     event.target.style.background = "";
		//     dragged.parentNode.removeChild( dragged );
		//     event.target.appendChild( dragged );
		// }

	}, false);

	element.addEventListener('paste', function (event) {
		var isChrome = false;
		if (event.clipboardData || event.originalEvent) {
			//not for ie11  某些chrome版本使用的是event.originalEvent
			var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
			console.log('clipboardData', clipboardData)
			if (clipboardData.items) {
				// for chrome
				var items = clipboardData.items,
					len = items.length,
					blob = null;
				isChrome = true;
				//items.length比较有意思，初步判断是根据mime类型来的，即有几种mime类型，长度就是几（待验证）
				//如果粘贴纯文本，那么len=1，如果粘贴网页图片，len=2, items[0].type = 'text/plain', items[1].type = 'image/*'
				//如果使用截图工具粘贴图片，len=1, items[0].type = 'image/png'
				//如果粘贴纯文本+HTML，len=2, items[0].type = 'text/plain', items[1].type = 'text/html'
				// console.log('len:' + len);
				// console.log(items[0]);
				// console.log(items[1]);
				// console.log( 'items[0] kind:', items[0].kind );
				// console.log( 'items[0] MIME type:', items[0].type );
				// console.log( 'items[1] kind:', items[1].kind );
				// console.log( 'items[1] MIME type:', items[1].type );

				//阻止默认行为即不让剪贴板内容在div中显示出来
				event.preventDefault();

				//在items里找粘贴的image,据上面分析,需要循环  
				for (var i = 0; i < len; i++) {
					if (items[i].type.indexOf("image") !== -1) {
						// console.log(items[i]);
						// console.log( typeof (items[i]));

						//getAsFile() 此方法只是living standard firefox ie11 并不支持        
						blob = items[i].getAsFile();
					}
				}
				if (blob !== null) {
					// var file=blobToFile(blob,'111.jpg')
					console.log('file',blob)

					upload.start(blob)
					
					// var reader = new FileReader();
					// reader.onload = function (event) {
					// 	// event.target.result 即为图片的Base64编码字符串
					// 	var base64_str = event.target.result
					// 	//可以在这里写上传逻辑 直接将base64编码的字符串上传（可以尝试传入blob对象，看看后台程序能否解析）
					// 	console.log('img base64',base64_str)
					// 	// uploadImgFromPaste(base64_str, 'paste', isChrome);
					// }
					// reader.readAsDataURL(blob);
				}
			}

		}
	})


	// 添加黏贴上传功能
}

export default dndUpload
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
