var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var MODULE_CONFIG = {
    COLLECTION:'floders'
}
/*添加文集*/
function * add (next){

    let name = this.request.fields.name

    // let insert_obj = objectAssign({word,describe,sentence,end_time,is_move:false},this.login_status)
    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .insert({
                            name
                        })

    this.body = {
        status:true,
        msg:'更新成功'
        id:res.insertedIds[1]
    }
}
/*返回列表*/
function * list (next){
    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .find({})
    this.body = {
        status:true,
        result:res
    }
}

module.exports = {
    add,
    list
}