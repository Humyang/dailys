var app = require('koa')()
var body = require('koa-better-body')
var router = require('koa-router')()
var cors = require('koa-cors')
var mongo = require('koa-mongo')



var CONSTANT = require('./constant.js')
var objectAssign = require('object-assign')


// var LOGIN = require('./module/login.js')
var ARTICLE = require('./module/word.js')

app.use(cors())

// 添加单词
router.post('/article/update',ARTICLE.update)

app.use(mongo())
app.use(body())
app.use(function *(next){
    try{
        yield next
    }catch (err) {
        try{
            // 业务逻辑错误
            this.body = objectAssign({status:false},JSON.parse(err.message));
        }catch(err2){
            this.body = {
                status:false,
                msg:err.message,
                path:this.request.url
            }
        }
        console.log(err)
    }
})
app.use(router.routes()).use(router.allowedMethods());