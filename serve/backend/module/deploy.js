var marked = require('marked');
var renderer = new marked.Renderer();
var radCode = renderer.code
renderer.code = function (code, lang, escaped) {
    if(lang === 'raw'){
        return '<p class="lang-raw">'+code+'</p>'
    }
    var self = this
    return radCode.call(self,code,lang,escaped)
}
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true,
  highlight: function (code,type,sss) {
    return require('highlight.js').highlightAuto(code).value;
  },renderer:renderer
});

var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var MODULE_CONFIG = {
    COLLECTION:'deploy'
}
var ARTICLE = require('./article.js')
var objectAssign = require('object-assign')
// 发布文章
async function update(ctx){
    // debugger
    let selfuid = ctx.request.fields.selfuid
    let query_obj = objectAssign({uid:ctx.LOGIN_STATUS.uid,selfuid})
    // 获取文章内容
    let article = await ARTICLE._getContent(ctx)
    
    // 获取已发布文章
    let deployTopic = await _getContentArticleSelfUid(ctx,selfuid)
    let topic_id = null
    if(deployTopic!=404){
        topic_id=deployTopic.topic_id
    }else{
        topic_id=await _getMaxTopicId(ctx)+1
        
        // 获取最大的 topic_id
    }
    // 写入发布区
    let res = await ctx.mongo
        .db(CONFIG.dbName)
        .collection(MODULE_CONFIG.COLLECTION)
        .update(query_obj,
            {'$set':{createAt:(new Date()).getTime(),content:marked(article["codemirror"].content),title:article.title,article_selfuid:article.selfuid,topic_id:topic_id}},
            {'upsert':true}
        )
    ctx.body = {
        status:true,
        msg:'发布成功'
    }
}
async function  updateDepoly (ctx){
    let selfuid = ctx.request.fields.selfuid
    let preView = ctx.request.fields.preView
    let tags = ctx.request.fields.tags
    let titleImage = ctx.request.fields.titleImage
    let title = ctx.request.fields.title
    
    let query_obj = objectAssign(
        {selfuid,isMove:{$ne:true}},
        {uid:ctx.LOGIN_STATUS.uid})

    let setObj = {preView,tags,titleImage,title}

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
async function _getMaxTopicId(ctx){

    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .find({})
                        .sort({topic_id:-1}).limit(1).toArray()
    if(res.length>0){
        return res[0].topic_id
    }else{
        return 0
    }
    // return res
}
async function _getContentArticleSelfUid(ctx,uid){
    let query_obj={
        article_selfuid:uid
    }
    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .findOne(query_obj)
    if(res){
        return res
    }else{
        return 404
    }
}
async function _getContentByTopicId(ctx,id){

    let query_obj={
        topic_id:+id
    }
    console.log(query_obj)
    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .findOne(query_obj)
    
    if(res){
        return res
    }else{
        return 404
    }
}

async function t (ctx){
    
    let res = await _getContentByTopicId(ctx,ctx.params.id)
    if(res==404){
        await ctx.render('404');
    }else{
        await ctx.render('topic',{
            title:res.title,
            content:res.content,
            preView:res.preView,
            tags:res.tags,
            titleImage:res.titleImage,
            createAt:res.createAt
        });
    }
}
async function getIndex(ctx){
    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .find({},{_id:false,topic_id:true,title:true,
                            preView:true,
                            tags:true,
                            titleImage:true,
                            createAt:true})
                        .sort({_id:-1})
                        .toArray()
    console.log(res)
    await ctx.render('index',{
        list:res
    });
}
module.exports = {
    t,
    update,
    getIndex,
    updateDepoly
}