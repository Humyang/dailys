import * as API from '../fontend/index.js'
import * as BASE from '../fontend/base.js'
import expect from 'expect'
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

describe('文集测试', function() {

    let login = {}
    co(function*(){
        let username = 'test'+uid(10)
        login = yield API.LOGIN.regiest(username,'password1')

        it('----------新建', function(done) {
            co(function*(){

                BASE.getToken = expect.createSpy().andReturn()

                let add = yield API.FLODER.add('123123')
                assert(add.status,true,add)
                done()
            }).catch(function(err){
                done(err)
            })
        })
        it('----------列表', function(done) {
            co(function*(){
                let list = yield API.FLODER.list()
                assert(list.status,true,list)
                console.log(list)
                done()
            }).catch(function(err){
                done(err)
            })
        })
    }).catch(function(err){
    })
    

})