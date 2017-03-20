var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var UUID = require('uid')
var objectAssign = require('object-assign')

var MODULE_CONFIG = {
    COLLECTION:'articles'
}
/*插入和更新文章*/
function * add (next){

    let title = this.request.fields.title
    let floder_uid = this.request.fields.floder_uid
    let selfuid = UUID(40)

    let insert_obj = objectAssign(
        {title,floder_uid,selfuid},
        this.login_status)
    
    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .insert(insert_obj)
    this.body = {
        status:true,
        msg:'新建成功',
        selfuid
    }
}
/*返回列表*/
function * list (next){
    let floder_uid = this.request.fields.floder_uid

    let query_obj = objectAssign(
        {floder_uid},
        this.login_status)

    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .find(query_obj)
                        .sort({_id:-1})
                        .toArray()
    this.body = {
        status:true,
        result:res
    }
}
/*更新列表*/
function * update (next){
    let selfuid = this.request.fields.selfuid
    let content = this.request.fields.content

    let query_obj = objectAssign(
        {selfuid},
        this.login_status)

    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .update(query_obj,
                            {'$set':{content}},
                            {'upsert':true}
                            )
    this.body = {
        status:true,
        result:res
    }
}
function * content (next){
    let selfuid = this.request.fields.selfuid

    let query_obj = objectAssign(
        {selfuid},
        this.login_status)

    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .findOne(query_obj)
    this.body = {
        status:true,
        result:res
    }
}
function * first (next){
    yield next
}
module.exports = {
    add,
    list,
    update,
    content
}