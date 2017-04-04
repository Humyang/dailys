var app = require('koa')()
var body = require('koa-better-body')
var router = require('koa-router')()
var cors = require('koa-cors')
var mongo = require('koa-mongo')



// var CONSTANT = require('../PREDEFINED/CONSTANT.js')
var objectAssign = require('object-assign')

var CONFIG = require('../PREDEFINED/APP_CONFIG.js')

var LOGIN = require('flogin')
var ARTICLE = require('./module/article.js')
var FLODER = require('./module/floder.js')

app.use(cors())

// 添加文章
router.post('/article/add',LOGIN.login_check(),ARTICLE.add)
router.post('/article/list',LOGIN.login_check(),ARTICLE.list)
router.post('/article/update',LOGIN.login_check(),ARTICLE.update)
router.post('/article/content',LOGIN.login_check(),ARTICLE.content)
router.post('/article/remove',LOGIN.login_check(),ARTICLE.remove)



// 添加目录
router.post('/floder/add',LOGIN.login_check(),FLODER.add)
router.post('/floder/list',LOGIN.login_check(),FLODER.list)
router.post('/floder/remove',LOGIN.login_check(),FLODER.remove)


router.all('/username/valid/:username',LOGIN.username_repeat)
router.post('/regiest',/*LOGIN.verify_code(),*/LOGIN.regiest)
router.post('/login',/*LOGIN.verify_code(),*/LOGIN.login)
router.post('/login_status_check',LOGIN.login_check(),function *(next){
    this.body = {
        status:true,
        msg:'在线'
    }
})
app.use(LOGIN.set({dbname:CONFIG.dbName,port:CONFIG.dbPort}))
app.use(mongo())
app.use(body())
app.use(function *(next){
    try{
        console.log('this.LOGIN_CONFIG',this.LOGIN_CONFIG)
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


app.listen(CONFIG.servePort)

console.log("listen serve on port ",CONFIG.servePort)