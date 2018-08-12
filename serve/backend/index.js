var app = require('koa')()
var body = require('koa-better-body')
var router = require('koa-router')()
var cors = require('koa-cors')
var mongo = require('koa-mongo')



// var CONSTANT = require('../PREDEFINED/CONSTANT.js')
var objectAssign = require('object-assign')

var CONFIG = require('../PREDEFINED/APP_CONFIG.js')

// var LOGIN = require('flogin')


var OAUTCH_CLIENT = require('../../../oauth_serve/client/index')

var ARTICLE = require('./module/article.js')
var FLODER = require('./module/floder.js')
var UPLOAD = require('./module/upload.js')
var USERCONFIG = require('./module/userConfig.js')
var SEARCH = require('./module/search.js')

var serve = require('koa-static');
var root_path = process.cwd()
app.use(serve(root_path+"/upload",{maxage:3153600000}))


app.use(cors())

// 搜索
router.post('/search',OAUTCH_CLIENT.login_check_remote(),SEARCH.search)

// 添加文章
router.post('/article/add',OAUTCH_CLIENT.login_check_remote(),FLODER.Mfloder_list_modify(),ARTICLE.add)
router.post('/article/list',OAUTCH_CLIENT.login_check_remote(),ARTICLE.list)
router.post('/article/update',OAUTCH_CLIENT.login_check_remote(),FLODER.Mfloder_list_modify(),ARTICLE.update)
router.post('/article/content',OAUTCH_CLIENT.login_check_remote(),ARTICLE.content)
router.post('/article/remove',OAUTCH_CLIENT.login_check_remote(),ARTICLE.remove)



// 添加目录
router.post('/floder/add',OAUTCH_CLIENT.login_check_remote(),FLODER.add)
router.post('/floder/list',OAUTCH_CLIENT.login_check_remote(),FLODER.list)
router.post('/floder/remove',OAUTCH_CLIENT.login_check_remote(),FLODER.remove)
// router.post('/floder/sorttype',OAUTCH_CLIENT.login_check_remote(),FLODER.sorttype)

// 登陆注册
// router.all('/username/valid/:username',LOGIN.username_repeat)
// router.post('/regiest',/*LOGIN.verify_code(),*/LOGIN.regiest)
// router.post('/login',/*LOGIN.verify_code(),*/LOGIN.login)
// router.post('/login_status_check',OAUTCH_CLIENT.login_check_remote(),function *ctx{
//     this.body = {
//         status:true,
//         msg:'在线'
//     }
// })

    
// 个人配置
router.post('/config/getAll',OAUTCH_CLIENT.login_check_remote(),USERCONFIG.getAll)
router.post('/config/floder_sort_type_update',OAUTCH_CLIENT.login_check_remote(),USERCONFIG.floderSortTypeUpdate)

// 上传
router.options('/upload', async function(ctx,next){
//   this.body=true
  ctx.body = true
  await next()
})
router.post('/upload', OAUTCH_CLIENT.login_check_remote(), UPLOAD.upload)

// app.use(LOGIN.set({dbname:CONFIG.dbName,port:CONFIG.dbPort}))

app.use(mongo())
app.use(body({textLimit:'10000kb',formLimit:'10000kb',jsonLimit:'10000kb'}))
app.use(async function (ctx,next){
    try{
        // console.log('this.LOGIN_CONFIG',this.LOGIN_CONFIG)
        // yield next
        await next()
    }catch (err) {
        try{
            // 业务逻辑错误
            ctx.body = objectAssign({status:false},JSON.parse(err.message));
        }catch(err2){
            ctx.body = {
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