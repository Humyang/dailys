var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var UUID = require('uid2')
var objectAssign = require('object-assign')
// var GDMP = require('../../../vendors/google-diff-match-patch-js/diff_match_patch_uncompressed.js')
// var dmp = new GDMP.diff_match_patch()
var MODULE_CONFIG = {
    COLLECTION:'deploy'
}
var throwError = require('./throwError.js')
var ERROR_CODE = require('../../PREDEFINED/ERROR_CODE.js')

/*插入和更新文章*/
async functioncontent ctx{
    let res = yield _getContent.call(this)
    
    // 渲染
    res.content
    // 写入
    res.history=[]
    this.body = {
        status:true,
        result:res
    }
}
/*返回列表*/
async functionlist ctx{
    let floder_uid = this.request.fields.floder_uid

    let query_obj = objectAssign(
        {floder_uid,isMove:{$ne:true}},
        this.login_status)
    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .find(query_obj,{content:0})
                        .sort({_id:-1})
                        .toArray()

    this.body = {
        status:true,
        result:res
    }
}
function* _getContent(){

    let selfuid = this.request.fields.selfuid

    let query_obj = objectAssign(
        {selfuid,isMove:{$ne:true}},
        this.login_status)

    let res = yield this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .findOne(query_obj)

    if(res.history === undefined){
        res.history = []
    }
    return res
}
async functioncontent ctx{
    

    // let query_obj = objectAssign(
    //     {selfuid,isMove:{$ne:true}},
    //     this.login_status)

    // let res = yield this.mongo
    //                     .db(CONFIG.dbName)
    //                     .collection(MODULE_CONFIG.COLLECTION)
    //                     .findOne(query_obj)

    let res = yield _getContent.call(this)
    res.history=[]
    this.body = {
        status:true,
        result:res
    }
}