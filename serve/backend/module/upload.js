var fs = require('fs');
var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
// var CONFIG = require('../../PREDEFINED/CONSTANT.js')
var throwError = require('./throwError.js')
var ERROR_CODE = require('../../PREDEFINED/ERROR_CODE.js')

const Path = require('path');

function moveFile(oldPath,newPath) {
    return new Promise((reslove,reject)=>{
      fs.rename(oldPath, newPath,function(err,res){
        if(err){reslove(false)}
        reslove(true)
      })
    })
}

/*

在磁盘遍历给定的路径，如果没有找到就立即创建

*/
function pathCheckAndCreate(path){

  var parse_path = Path.parse(path)

  var dirname = Path.dirname(path)
  
  if(parse_path.root != dirname){
    
    pathCheckAndCreate(dirname)

    if(!fs.existsSync(path)){
      fs.mkdirSync(path)
    }
  }
}
/* 上传 */
async function upload (ctx){
  debugger
    // debugger;
    // console.log(123)
    // console.log(ctx.request.token)
    var file = ctx.request.files.file
    // './upload/'+ ctx.LOGIN_STATUS.uid
    var root_path = process.cwd()
    var path = root_path + '/upload/'+ ctx.LOGIN_STATUS.uid
    pathCheckAndCreate(path)
    // var file_exits = await accessPath(path)
    // if(!file_exits){
    //   try{
    //   fs.mkdirSync(path)
    //   }
    //   catch(e){
    //     console.log(e)
    //   }
    // }

    // });

    // console.log(file_exits)
    let now=(new Date()).getTime()
  
    console.log(file.path,path +'/'+now+file.name)
    var obj = await moveFile(file.path, path +'/'+now+file.name)

    ctx.body = {
      status:1,
      img_url:"IPADDRESS/upload/"+ctx.LOGIN_STATUS.uid+'/'+now+file.name,
      size:file.size
    }
}
module.exports = {
    upload
}