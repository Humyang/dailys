var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var MODULE_CONFIG = {
    COLLECTION:'articles'
}
/*插入和更新文章*/
function * add (next){

    let title = this.request.fields.title
    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .insert({
                            title
                        })
    this.body = {
        status:true,
        msg:'新建成功'
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
function * first (next){
    yield next
}
module.exports = {
    add,
    list
}