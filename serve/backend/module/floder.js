var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var ARTICLE_CONFIG = {
    COLLECTION:'floders'
}
/*插入和更新文章*/
function * add (next){

    let content = this.request.fields.content

    // let insert_obj = objectAssign({word,describe,sentence,end_time,is_move:false},this.login_status)
    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(ARTICLE_CONFIG.COLLECTION)
                        .update({
                            content
                        })

    this.body = {
        status:true,
        msg:'更新成功'
    }
}
fun