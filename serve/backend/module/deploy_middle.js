var CONFIG = require("../../PREDEFINED/APP_CONFIG.js");
var MODULE_CONFIG = {
  COLLECTION: "deploy"
};

async function _getContentArticleSelfUid(ctx, uid) {
    let query_obj = {
      article_selfuid: uid
    };
    let res = await ctx.mongo
      .db(CONFIG.dbName)
      .collection(MODULE_CONFIG.COLLECTION)
      .findOne(query_obj);
    if (res) {
      return res;
    } else {
      return 404;
    }
  }

  module.exports = {
    _getContentArticleSelfUid
  };
  