import * as API from '../fontend/index.js'
var CODE = require('../PREDEFINED/ERROR_CODE.js').CODE
import co from 'co'

function assert(value,expect,msg,append_msg){
    if(value != expect){
        console.log(append_msg)
        throw new Error(msg)
    }
}

global.localStorage = {}
global.localStorage.setItem=function(){}
global.localStorage.getItem=function(){}
describe('更新&添加文章', function() {
    it('普通更新', function(done) {
        co(function*(){
            let article_update = yield API.articleUpdate('111','222')
            assert(article_update.status,true,article_update)
            done()
        }).catch(function(err){
            done(err)
        })
    })
})