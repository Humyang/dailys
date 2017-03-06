import * as API from '../fontend/index.js'
var CODE = require('../PREDEFINED/ERROR_CODE.js').CODE

describe('单词正删改查模块----', function() {
    it('增删改查', function(done) {
        co(function*(){
            let article_update = yield API.articleUpdate('111','222')
            assert(article_update.status,true,article_update)
            done()
        }).catch(function(err){
            done(err)
        })
    })
})