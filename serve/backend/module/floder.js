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
    let floder_uid = uid(40)
    let insert_obj = objectAssign({
                            name,
                            floder_uid,
                            isMove:false
                        },this.login_status)
    // let logined_uid = this.login_status.uid
    
    // let insert_obj = objectAssign({word,describe,sentence,end_time,is_move:false},this.login_status)
    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .insert(insert_obj)

    this.body = {
        status:true,
        msg:'更新成功',
        id:res.insertedIds[1],
        floder_uid
    }
}
/*返回列表*/
function * list (next){
    let filter_object = objectAssign(this.login_status,{isMove:{$ne:true}})
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
function * remove (next){
    let floder_uid = this.request.fields.floder_uid
    // let logined_uid = this.login_status.uid

    let query_obj = objectAssign(
        {floder_uid},
        this.login_status)

    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .update(query_obj,
                            {'$set':{isMove:true}}
                            )
    console.log(query_obj)
    this.body = {
        status:true,
        result:res
    }
}
module.exports = {
    add,
    list,
    remove
}