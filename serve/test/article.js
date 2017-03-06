import * as API from '../fontend/index.js'
var CODE = require('../PREDEFINED/ERROR_CODE.js').CODE

describe('单词正删改查模块----', function() {
    it('增删改查', function(done) {
        co(function*(){
            let verifycode = yield API.verify_code()
            assert(verifycode.status,true,verifycode)
        }).catch(function(err){
            if(err.STATUSCODE === CODE.WORD_NOT_FIND.STATUSCODE){
                done()
            }else{
                console.log(err)
                done(err)
            }
        })
    })
})