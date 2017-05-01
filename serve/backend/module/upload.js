var fs = require('fs');
var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var throwError = require('./throwError.js')
var ERROR_CODE = require('../../PREDEFINED/ERROR_CODE.js')
var moveFile = function(oldPath,newPath) {
  return function(fn) {
    fs.rename(oldPath, newPath,fn)
  }
}
/* 上传 */
function * upload (next){
    console.log(this.request.token)
    var file = this.request.files[0]
    // console.log(file)

    var file_exits = yield fs.access('./upload/'+ this.login_status.uid, fs.constants.R_OK | fs.constants.W_OK);

    console.log(file_exits)

    var obj = yield moveFile(file.path, './upload/'+ this.login_status.uid +'/'+file.name)

    this.body = {
      status:1,
      img_url:"http://localhost:"+CONFIG.servePort+"/temp/"+file.name,
      size:file.size
    }
}
module.exports = {
    upload
}