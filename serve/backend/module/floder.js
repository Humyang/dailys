var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var objectAssign = require('object-assign')
var uid = require('uid')

var MODULE_CONFIG = {
    COLLECTION:'floders'
}
/*添加文集*/
async function add (ctx){

    let name = ctx.request.body.name
    let token = ctx.request.body.token
    let floder_uid = uid(40)
    let insert_obj = objectAssign({
                            name,
                            floder_uid,
                            isMove:false,
                            timemap:(new Date()).getTime(),
                            timemapTotal:0
                        },{uid:ctx.LOGIN_STATUS.uid})
    // let logined_uid = {uid:ctx.LOGIN_STATUS.uid}
    
    // let insert_obj = objectAssign({word,describe,sentence,end_time,is_move:false},{uid:ctx.LOGIN_STATUS.uid})
    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .insert(insert_obj)

    ctx.body = {
        status:true,
        msg:'更新成功',
        id:res.insertedIds[1],
        floder_uid
    }
}
/*返回列表*/
async function list (ctx){
    let filter_object = objectAssign({uid:ctx.LOGIN_STATUS.uid},{isMove:{$ne:true}})
    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .find(filter_object,{history:false})
                        .sort({_id:-1})
                        .toArray()
    ctx.body = {
        status:true,
        result:res
    }
}
async function remove (ctx){
    let floder_uid = ctx.request.body.floder_uid
    // let logined_uid = {uid:ctx.LOGIN_STATUS.uid}

    let query_obj = objectAssign(
        {floder_uid},
        {uid:ctx.LOGIN_STATUS.uid})

    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .update(query_obj,
                            {'$set':{isMove:true}}
                            )
    // console.log(query_obj)
    ctx.body = {
        status:true,
        result:res
    }
}

async function  _findOne(ctx){

    let floder_uid = ctx.request.body.floder_uid

    let query_obj = objectAssign(
        {floder_uid,isMove:{$ne:true}},
        {uid:ctx.LOGIN_STATUS.uid})

    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .findOne(query_obj)

    return res
}
function Mfloder_list_modify(){
    return async function plugin (ctx,next) {

        // 为 floder 添加一个最后修改日期，用来排序
        // var timemap = (new Date()).timemap

        let floder_uid = ctx.request.body.floder_uid

        let timemap = ctx.request.body.timemap

        let timemapTotal = 0
        let findone = await _findOne(ctx)
        if(findone.timemapTotal){
            timemapTotal = findone.timemapTotal
        }
        timemapTotal++

        // console.log(timemap)
        let query_obj = objectAssign(
        {floder_uid},
        {uid:ctx.LOGIN_STATUS.uid})

        let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .update(query_obj,
                            {'$set':{timemap,timemapTotal}},
                            {'upsert':true}
                            )




// console.log(query_obj)

        // let token = ctx.request.body.token
        // let _login_check_res = await ctx.mongo
        //             .db(ctx.LOGIN_CONFIG.dbname)
        //             .collection('logined_token')
        //             .findOne({token:token})
        // if(_login_check_res === null){
        //     // throw new Error('未登陆')
        //     throwError(CODE.LOGIN_NO_LOGIN)
        // }
        // if(_login_check_res.status === false){
        //     throwError(CODE.LOGIN_TOKEN_INVALID)
        // }

        // // // console.log('_login_check_res',_login_check_res)
        // // 2016年11月28日17:55:51 todo：
        // // _login_check_res.username
        // // 获取 user 的资料
        // let userinfo = await ctx.mongo
        //                         .db(ctx.LOGIN_CONFIG.dbname)
        //                         .collection('user')
        //                         .findOne({username:_login_check_res.username})

        // ctx.LOGIN_STATUS = {
        //     uid:userinfo.uid
        // }
        await next()
    } 
}


module.exports = {
    add,
    list,
    remove,
    Mfloder_list_modify
}