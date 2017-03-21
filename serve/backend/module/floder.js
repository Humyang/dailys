var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var objectAssign = require('object-assign')
var uid = require('uid')

var MODULE_CONFIG = {
    COLLECTION:'floders'
}
/*添加文集*/
function * add (next){

    let name = this.request.fields.name
    let token = this.request.fields.token

    // let filter_object = objectAssign({this.login_status})
    let logined_uid = this.login_status.uid
    // let insert_obj = objectAssign({word,describe,sentence,end_time,is_move:false},this.login_status)
    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .insert({
                            name,
                            floder_uid:uid(40),
                            logined_uid
                        })

    this.body = {
        status:true,
        msg:'更新成功',
        id:res.insertedIds[1]
    }
}
/*返回列表*/
function * list (next){
    let filter_object = objectAssign({logined_uid:this.login_status.uid})
    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .find(filter_object)
                        .sort({_id:-1})
                        .toArray()
    this.body = {
        status:true,
        result:res
    }
}

module.exports = {
    add,
    list
}