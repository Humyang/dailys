var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var ARTICLE_CONFIG = {
    COLLECTION:'articles'
}
/*插入和更新文章*/
function * update (next){

    let word = this.request.fields.content
    let describe = this.request.fields.title

    // let insert_obj = objectAssign({word,describe,sentence,end_time,is_move:false},this.login_status)
    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(ARTICLE_CONFIG.COLLECTION)
                        .insert({
                            word,
                            describe
                        })

    this.body = {
        status:true,
        msg:'更新成功'
    }
}
function * first (next){
    
    yield next
}
module.exports = {
    update,
}