import * as API from '../fontend/index.js'
import * as BASE from '../fontend/base.js'
import expect from 'expect'
var CODE = require('../PREDEFINED/ERROR_CODE.js').CODE
import co from 'co'
import uid from 'uid'


function assert(value,expect,msg,append_msg){
    if(value != expect){
        console.log(append_msg)
        throw new Error(msg)
    }
}

global.localStorage = {}
global.localStorage.setItem=function(){}
global.localStorage.getItem=function(){}

describe('文集测试', function() {

    let login = {}
    before(function() {
        return co(function*(){
            let username = 'test'+uid(10)
            let regiest = yield API.LOGIN.regiest(username,'password1')
            login = yield API.LOGIN.login(username,'password1')
            BASE.getToken = expect.createSpy().andReturn(login.token)
        })
    });
    describe('新建文集', function() {
        it('应该返回正确结果', function(done) {
            co(function*(){
                let add = yield API.FLODER.add('123123')
                assert(add.status,true,add)
                done()
            }).catch(function(err){
                done(err)
            })
        })
    })
    describe('查询列表', function() {
        it('应该返回正确结果', function(done) {
            co(function*(){
                let list = yield API.FLODER.list()
                assert(list.status,true,list)
                console.log(list)
                done()
            }).catch(function(err){
                done(err)
            })
        })
    })
    describe('删除列表', function() {
        it('应该返回正确结果', function(done) {
            co(function*(){
                let add = yield API.FLODER.add('test remove floder')
                let list = yield API.FLODER.list()
                let remove = yield API.FLODER.remove(add.floder_uid)
                let list2 = yield API.FLODER.list()
                console.log(list2)
                done()
            }).catch(function(err){
                done(err)
            })
        })
    })

})