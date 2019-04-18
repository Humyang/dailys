var koa = require('koa')
var CONFIG = require('../PREDEFINED/APP_CONFIG.js')
var MODULE_CONFIG = {
  COLLECTION: 'articles'
}
const app = new koa();

var mongo = require('koa-mongo')

app.use(mongo())
app.use(async function (ctx, next) {
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
})

app.listen(3000);


