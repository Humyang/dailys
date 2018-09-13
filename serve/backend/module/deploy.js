var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var MODULE_CONFIG = {
    COLLECTION:'deploy'
}



async function _getContent(ctx){

    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .findOne(query_obj)

    // if(res.history === undefined){
    //     res.history = []
    // }
    return res
}

async function t (ctx){
    
    await ctx.render('login',{
        title:'title',
        content:'content'
    });
}
module.exports = {
    t
}