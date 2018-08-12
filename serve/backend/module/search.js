var CONFIG = require('../../PREDEFINED/APP_CONFIG.js')
var objectAssign = require('object-assign')
var MODULE_CONFIG = {
    COLLECTION:'articles'
}
// 搜索目录和文章

async function search (ctx){
	let keywords = ctx.request.fields.keywords
	// console.log(keywords
	// 	)
	// let filter_object = objectAssign(ctx.LOGIN_STATUS,{isMove:{$ne:true}})
    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .find({$or:[{content:{$regex:".*"+keywords+".*"}},{title:{$regex:".*"+keywords+".*"}}]},	
                    		  { score: { $meta: "textScore" },content:0,history:false})
                        .sort( { score: { $meta: "textScore" }})
                        .toArray()

                        // 这种方式要建立索引
                        // .find({$text:{$search:keywords}},
                    		  // { score: { $meta: "textScore" },content:0,history:false})
                        // .sort( { score: { $meta: "textScore" }})
                        // .toArray()
    ctx.body = {
        status:true,
        result:res
    }

}

// 搜索历史记录

module.exports = {
	search
}