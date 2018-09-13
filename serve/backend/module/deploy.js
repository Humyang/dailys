var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var MODULE_CONFIG = {
    COLLECTION:'deploy'
}
var ARTICLE = require('./article.js')
var objectAssign = require('object-assign')
// 发布文章
async function update(ctx){

    let selfuid = ctx.request.fields.selfuid
    let query_obj = objectAssign({uid:ctx.LOGIN_STATUS.uid,selfuid})
    // 获取文章内容
    let article = await ARTICLE._getContent(ctx)
    // 写入发布区
    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .update(query_obj,
                            {'$set':{content:article.content}},
                            {'upsert':true}
                        )
                        ctx.body = {
                            status:true,
                            msg:'发布成功'
                        }
    // let res = await ctx.mongo
    //     .db(CONFIG.dbName)
    //     .collection(MODULE_CONFIG.COLLECTION)
    //     .findOne(query_obj)
}
async function _getContent(ctx,id){

    let query_obj={
        topic_id:id
    }
    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .findOne(query_obj)

    // if(res.history === undefined){
    //     res.history = []
    // }
    if(res){
        return res
    }else{
        return 404
    }
    
}
async function getIndex(ctx){
    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .find()
                        .sort({_id:-1})
                        .toArray()
    await ctx.render('index',{
        list:JSON.stringify(res)
    });
}
async function t (ctx){
    let content =""
    
    let res = await _getContent(ctx,ctx.params.id)
    if(res==404){
        await ctx.render('404');
    }else{
        await ctx.render('topic',{
            title:res.title,
            content:res.content
        });
    }
    
    
}
module.exports = {
    t,
    update,
    getIndex
}