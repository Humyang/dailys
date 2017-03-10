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
describe('文章测试', function() {
    it('----------新建', function(done) {
        co(function*(){
            let add = yield API.ARTICLE.add('123123')
            assert(add.status,true,add)
            done()
        }).catch(function(err){
            done(err)
        })
    })
})