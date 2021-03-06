
require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');
import * as BASE from './base.js'
var CODE = require('../PREDEFINED/CONSTANT.js').CODE
var CONFIG = require('../PREDEFINED/APP_CONFIG.js')
import {
    IP,
    HTTP_FAIL
} from '../PREDEFINED/CONSTANT.js'


// 业务逻辑错误处理

// 对返回报文进行预处理
// 返回 false 表示发生业务逻辑问题
// 返回 true 表示未发生业务逻辑问题，继续执行
const preProcessRsp = function(store,reslove,reject) {
    if (!store.status) {
        reject(store)
        return false
    }
    return true;
};

const mFetch = function(path,data,token) {
    return new Promise(function(reslove,reject){
        let comb_data = {}
        if(data===undefined){
            data = {}
        }else{
            comb_data = data
            if(data.token === undefined){
                // console.log(123123)
                comb_data = Object.assign(data,{token:BASE.getToken()})
            }
        }
        let root = this
        console.log('token')
        fetch(IP+path,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "_token":token || data.token || comb_data.token ||BASE.getToken()||'unkonw'
          },
          body: JSON.stringify(comb_data)
        })
        .then(function(response) {
            // HTTP 错误处理
            if (response.status != 200) {
                // throw new Error("Bad response from server: status",response.status);
                reject("Bad response from server: status",response.status)
            }
            return response.json();
        })
        .then(function(res) {
            if(preProcessRsp(res,reslove,reject)){
                reslove(res)
            }else{
                reject(res.msg)
            }
        })
        .catch(function(ex){
            reject({
                MSG:ex.message
            })
        });
    })   
};
export default mFetch