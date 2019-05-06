var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var UUID = require('uid')
var objectAssign = require('object-assign')
var GDMP = require('../../../vendors/google-diff-match-patch-js/diff_match_patch_uncompressed.js')
var dmp = new GDMP.diff_match_patch()
var MODULE_CONFIG = {
    COLLECTION:'articles'
}
var throwError = require('./throwError.js')
var ERROR_CODE = require('../../PREDEFINED/ERROR_CODE.js')

var DEPLOY_MIDDLE = require("./deploy_middle.js")

/*插入和更新文章*/
async function add (ctx){

    let title = ctx.request.fields.title
    let floder_uid = ctx.request.fields.floder_uid
    let selfuid = UUID(40)
    // let editor = ctx.request.fields.editor

    let insert_obj = objectAssign(
        {title,floder_uid,selfuid,isMove:false},
        {uid:ctx.LOGIN_STATUS.uid,codemirror:{history:[]},editor:{history:[]}})
        
    let insert_obj_editor = objectAssign(
        {title,floder_uid,selfuid,isMove:false},
        {uid:ctx.LOGIN_STATUS.uid})
    
    await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .insert(insert_obj)
    
    ctx.body = {
        status:true,
        msg:'新建成功',
        selfuid
    }
}
/*返回列表*/
async function  list (ctx){
    let floder_uid = ctx.request.fields.floder_uid

    let query_obj = objectAssign(
        {floder_uid,isMove:{$ne:true}},
        {uid:ctx.LOGIN_STATUS.uid})
    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .find(query_obj,{content:0,history:false,})
                        .sort({_id:-1})
                        .toArray()

    ctx.body = {
        status:true,
        result:res
    }
}


/*更新列表*/
async function  update (ctx){
    let selfuid = ctx.request.fields.selfuid
    let content = ctx.request.fields.content
    let title = ctx.request.fields.title
    let editor = ctx.request.fields.editor

    let query_obj = objectAssign(
        {selfuid,isMove:{$ne:true}},
        {uid:ctx.LOGIN_STATUS.uid})

    let query_content = await _getContent(ctx)
    
    // let patches = dmp.patch_make(content)
    let dmp_patch_result_editor=null
    let dmp_patch_result_codemirror=null
    
    let setObj = {}
    if(editor=="codemirror"){
        let patches = content
        let targer_value = query_content["codemirror"].content
        if(targer_value === undefined){
            targer_value = ""
        }
        query_content["codemirror"].history.push(patches)
        dmp_patch_result_codemirror = dmp.patch_apply(patches, targer_value)
        for (var i = dmp_patch_result_codemirror[1].length - 1; i >= 0; i--) {
            if(dmp_patch_result_codemirror[1][i] != true){
    
                throwError(ERROR_CODE.CODE.ARTICLE_SAVE_ERROR)
            }
        }
        setObj = {"codemirror":{content:dmp_patch_result_codemirror[0],history:query_content["codemirror"].history},title}
    }
    if(editor=="editor"){
        let patches = content
        let targer_value = query_content["editor"].content
        if(targer_value === undefined){
            targer_value = ""
        }
        query_content["editor"].history.push(patches)
        dmp_patch_result_editor = dmp.patch_apply(patches, targer_value)
        for (var i = dmp_patch_result_editor[1].length - 1; i >= 0; i--) {
            if(dmp_patch_result_editor[1][i] != true){
                throwError(ERROR_CODE.CODE.ARTICLE_SAVE_ERROR)
            }
        }
        setObj = {"editor":{content:dmp_patch_result_editor[0],history:query_content["editor"].history},title}
    }

    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .update(query_obj,
                            {'$set':setObj},
                            {'upsert':true}
                        )

    

    ctx.body = {
        status:true,
        result:res
    }
}

async function  remove (ctx){
    let selfuid = ctx.request.fields.selfuid

    let query_obj = objectAssign(
        {selfuid},
        {uid:ctx.LOGIN_STATUS.uid})

    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .update(query_obj,
                            {'$set':{isMove:true}}
                            )


    ctx.body = {
        status:true,
        result:res
    }
}
/*
    result
        {
            _id
            content
            floder_uid
            isMove
            selfuid
            title
            uid,
            history
        }
*/

async function _getContent(ctx){

    let selfuid = ctx.request.fields.selfuid
    
    // let editor = ctx.request.fields.editor

    let query_obj = objectAssign(
        {selfuid,isMove:{$ne:true}},
        {uid:ctx.LOGIN_STATUS.uid})

    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .findOne(query_obj)

    if(res && res.history === undefined){
        res.history = []
    }
    let deploy = await DEPLOY_MIDDLE._getContentArticleSelfUid(ctx,selfuid)
    res.deploy = deploy
    return res
}

async function  content (ctx){
    let res = await _getContent(ctx)
    if(res){res.history=[]}else{
        
    }
    

    ctx.body = {
        status:true,
        result:res
    }
}
async function alterDatabase(ctx, next) {
    let all = await ctx.mongo.db(CONFIG.dbName)
      .collection(MODULE_CONFIG.COLLECTION).find({}).toArray()
  
    for (let index = 0; index < all.length; index++) {
      const element = all[index];
      let query_obj = {
        selfuid: element.selfuid
      }
      let setObj = {
        codemirror: {
          content: element.content,
          history: element.history
        },
        editor: {
          history: [],
          content: []
        }
      }
      await ctx.mongo.db(CONFIG.dbName)
        .collection(MODULE_CONFIG.COLLECTION).update(query_obj, {
          '$set': setObj
        })
    }
  }
  async function  updatedeploy (ctx){
    let selfuid = ctx.request.fields.selfuid
    let preView = ctx.request.fields.preView
    let tags = ctx.request.fields.tags
    let titleImage = ctx.request.fields.titleImage
    let title = ctx.request.fields.title
    
    let query_obj = objectAssign(
        {selfuid,isMove:{$ne:true}},
        {uid:ctx.LOGIN_STATUS.uid})

    let setObj = {deploy_setting:{preView,tags,titleImage,title}}


    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .update(query_obj,
                            {'$set':setObj},
                            {'upsert':true}
                        )
    ctx.body = {
        status:true,
        result:res
    }
}
module.exports = {
    add,
    list,
    update,
    content,
    remove,
    alterDatabase,
    _getContent,
    updatedeploy
}