var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var objectAssign = require('object-assign')
var uid = require('uid')

var MODULE_CONFIG = {
    COLLECTION:'userconfigs'
}

async function floderSortTypeUpdate (ctx){
    let type = ctx.request.fields.type
    // let obj = objectAssign({
    //                         floder_sort_type:type
    //                     },{uid:ctx.LOGIN_STATUS.uid})
    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .update(
                            {uid:ctx.LOGIN_STATUS.uid},
                            {'$set':{floder_sort_type:type}},
                            {'upsert':true}
                        )

    ctx.body = {
        status:true,
        msg:'成功'
    }
}
async function getAll (ctx){

    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .findOne({uid:ctx.LOGIN_STATUS.uid})
    ctx.body = {
        status:true,
        result:res
    }
}
module.exports = {
    getAll,
    floderSortTypeUpdate
}