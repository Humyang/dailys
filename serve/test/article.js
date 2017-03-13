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
    it('----------列表', function(done) {
        co(function*(){
            let list = yield API.ARTICLE.list()
            assert(list.status,true,list)
            console.log(list)
            done()
        }).catch(function(err){
            done(err)
        })
    })
    it('----------修改', function(done) {
        co(function*(){
            let add = yield API.ARTICLE.add('123123')
            assert(add.status,true,add)
            let update = yield API.ARTICLE.update('456789',add.selfuid)
            assert(update.status,true,update)
            let update2 = yield API.ARTICLE.update('abcdefg',add.selfuid)
            assert(update2.status,true,update2)
            let query = yield API.ARTICLE.content(add.selfuid)
            assert(query.status,true,query)

            console.log('query------------',query)

            done()

        }).catch(function(err){
            done(err)
        })
    })
})