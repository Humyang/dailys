var CONFIG = require('../../PREDEFINED/DBCONFIG.js')
var ARTICLE_CONFIG = {
    COLLECTION:'articles'
}
/*插入和更新文章*/
function * update (next){

    let word = this.request.fields.content
    let describe = this.request.fields.title

    // let insert_obj = objectAssign({word,describe,sentence,end_time,is_move:false},this.login_status)
    let res = yield this.mongo
                        .db(CONFIG.dbname)
                        .collection(ARTICLE_CONFIG.COLLECTION)
                        .insert({
                            word,
                            describe
                        })
}
function * first (next){
    
    yield next
}