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
async function content (ctx){
    let res = await _getContent.call(ctx)
    
    // 渲染
    res.content
    // 写入
    res.history=[]
    ctx.body = {
        status:true,
        result:res
    }
}
/*返回列表*/
async function list (ctx){
    let floder_uid = ctx.request.fields.floder_uid

    let query_obj = objectAssign(
        {floder_uid,isMove:{$ne:true}},
        ctx.LOGIN_STATUS)
    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .find(query_obj,{content:0})
                        .sort({_id:-1})
                        .toArray()

    ctx.body = {
        status:true,
        result:res
    }
}
async function  _getContent(){

    let selfuid = ctx.request.fields.selfuid

    let query_obj = objectAssign(
        {selfuid,isMove:{$ne:true}},
        ctx.LOGIN_STATUS)

    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .findOne(query_obj)

    if(res.history === undefined){
        res.history = []
    }
    return res
}
async function content (ctx){
    

    // let query_obj = objectAssign(
    //     {selfuid,isMove:{$ne:true}},
    //     ctx.LOGIN_STATUS)

    // let res = await ctx.mongo
    //                     .db(CONFIG.dbName)
    //                     .collection(MODULE_CONFIG.COLLECTION)
    //                     .findOne(query_obj)

    let res = await _getContent.call(ctx)
    res.history=[]
    ctx.body = {
        status:true,
        result:res
    }
}