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

  // console.log('alter database',all)

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
  // try{
  //     // console.log('ctx.LOGIN_CONFIG',ctx.LOGIN_CONFIG)
  //     // await next
  //     await next()
  // }catch (err) {
  //     try{
  //         // 业务逻辑错误
  //         ctx.body = objectAssign({status:false},JSON.parse(err.message));
  //     }catch(err2){
  //         ctx.body = {
  //             status:false,
  //             msg:err.message,
  //             path:ctx.request.url
  //         }
  //     }
  //     console.log('catch',err)
  // }
})

app.listen(3000);

// {
//   "_id": ObjectId("58e45709918cd61fad91b4f1"),
//   "title": "FAB",
//   "floder_uid": "n3bitk9g7yxeo428br2oad52ht23g4at4gyeyipc",
//   "selfuid": "jt3b3w224phv695eg6hpppcobwsdyryxap0ucb7x",
//   "isMove": false,
//   "uid": "ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd",
//   "content": "# FAB\n\n## FAB（属性，作用，益处）的法则 \n\nFAB对应的是三个英文单词：Feature、Advantage和Benefit，按照这样的顺序来介绍，就是说服性演讲的结构，它达到的效果就是让客户相信你的是最好的。现在解释一下说服性的演讲过程： \n\n### 1．属性（Feature） \n\n这个单词需要注意，经常把它翻译成特征或特点，而且很多销售人员至今还把它翻译成特征或特点。特 征，顾名思义就是区别于竞争对手的地方。当你介绍产品且与竞争对手的产品进行比较时，就会让客户产生一定的抵触情绪。 \n原因是 什么？因为在销售的FAB中不应把Feature翻译成特征或特点，而应翻译成属性，即你的产品所包含的客观现实，所具有的属性。比如，讲台是木头做的，木头做的就是产品所包含的某项客观现实、属性（Feature）。 \n\n### 2．作用（Advantage） \n\n很多销售人员顾名 思义地把它翻译成了优点，优点就是你们比竞争对手好的方面，这自然会让客户产生更大的抵触情绪，因为你们所面临的竞争对手非常多，相似的产品也很多，你们的产品不可能比所有的产品都好。 \n现实中的每一个产品都有各自的特征，当你们说产品的某个功能比竞争 对手好的时候，客户就会产生非常大的抵触情绪。实际上，在销售中把A（Advantage）翻译成作用会更好一些，作用（Advantage）就是 能够给客户带来的用处。 \n\n### 3．益处（Benefit） \n\n就是给客户带来的利益。比如，讲台是木头做的，那么木头做的给客户带来的益处就是非常轻便。 \nFAB应该这样解释，这个讲台是木头做的，搬起来很轻便，所以使用非常方便。这样的结构，是你说服性的演讲的结构，只有这样的结构才能让客户觉得你的产品满足了他的需求，并且愿意购买你的产品。"
// }

{
  "_id": ObjectId("58e45709918cd61fad91b4f1"),
  "title": "FAB",
  "floder_uid": "n3bitk9g7yxeo428br2oad52ht23g4at4gyeyipc",
  "selfuid": "jt3b3w224phv695eg6hpppcobwsdyryxap0ucb7x",
  "isMove": false,
  "uid": "ljdmLAjyC5XVAPn44RrmddOK2r5e0idcjHuVsnVd",
  "content": "# FAB\n\n## FAB（属性，作用，益处）的法则 \n\nFAB对应的是三个英文单词：Feature、Advantage和Benefit，按照这样的顺序来介绍，就是说服性演讲的结构，它达到的效果就是让客户相信你的是最好的。现在解释一下说服性的演讲过程： \n\n### 1．属性（Feature） \n\n这个单词需要注意，经常把它翻译成特征或特点，而且很多销售人员至今还把它翻译成特征或特点。特 征，顾名思义就是区别于竞争对手的地方。当你介绍产品且与竞争对手的产品进行比较时，就会让客户产生一定的抵触情绪。 \n原因是 什么？因为在销售的FAB中不应把Feature翻译成特征或特点，而应翻译成属性，即你的产品所包含的客观现实，所具有的属性。比如，讲台是木头做的，木头做的就是产品所包含的某项客观现实、属性（Feature）。 \n\n### 2．作用（Advantage） \n\n很多销售人员顾名 思义地把它翻译成了优点，优点就是你们比竞争对手好的方面，这自然会让客户产生更大的抵触情绪，因为你们所面临的竞争对手非常多，相似的产品也很多，你们的产品不可能比所有的产品都好。 \n现实中的每一个产品都有各自的特征，当你们说产品的某个功能比竞争 对手好的时候，客户就会产生非常大的抵触情绪。实际上，在销售中把A（Advantage）翻译成作用会更好一些，作用（Advantage）就是 能够给客户带来的用处。 \n\n### 3．益处（Benefit） \n\n就是给客户带来的利益。比如，讲台是木头做的，那么木头做的给客户带来的益处就是非常轻便。 \nFAB应该这样解释，这个讲台是木头做的，搬起来很轻便，所以使用非常方便。这样的结构，是你说服性的演讲的结构，只有这样的结构才能让客户觉得你的产品满足了他的需求，并且愿意购买你的产品。",
  "codemirror": {
    "content": "# FAB\n\n## FAB（属性，作用，益处）的法则 \n\nFAB对应的是三个英文单词：Feature、Advantage和Benefit，按照这样的顺序来介绍，就 是说服性演讲的结构，它达到的效果就是让客户相信你的是最好的。现在解释一下说服性的演讲过程： \n\n### 1．属性（Feature） \n\n这个单词需要注意，经常把它翻译成特征或特点，而且很多销售人员至今还把它翻译成特征或特点。特征，顾名思义就是区别于竞争对手的地方。当你介绍产品且与竞争对手的产品进行比较时，就会让客户产生一定的抵触情绪。 \n原因是什么？因为在销售的FAB中不应把Feature翻译成特征或特点，而应翻译成属性，即你的产品所包含的客观现实，所具有的属性。比如，讲台是木头做的，木头做的就是产 品所包含的某项客观现实、属性（Feature）。 \n\n### 2．作用（Advantage） \n\n很多销售人员顾名思义地把它翻译成了优点，优点 就是你们比竞争对手好的方面，这自然会让客户产生更大的抵触情绪，因为你们所面临的竞争对手非常多，相似的产品也很多，你们的产品不可能比所有的产品都好。 \n现实中的每一个产品都有各自的特征，当你们说产品的某个功能比竞争对手好的时候，客户就会产生非 常大的抵触情绪。实际上，在销售中把A（Advantage）翻译成作用会更好一些，作用（Advantage）就是能够给客户带来的用处。 \n\n### 3．益处（Benefit） \n\n就是给客户带来的利益。比如，讲台是木头做的，那么木头做的给客户带来的益处就是非常轻便。 \nFAB应 该这样解释，这个讲台是木头做的，搬起来很轻便，所以使用非常方便。这样的结构，是你说服性的演讲的结构，只有这样的结构才能让客户觉得你的产品满足了他的需求，并且愿意购买你的产品。",
    "history": null
  },
  "editor": {
    "history": [],
    "content": []
  }
}
