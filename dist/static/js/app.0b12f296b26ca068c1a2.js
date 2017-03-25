webpackJsonp([1,2],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__ = __webpack_require__(25);



const removeToken = function(page_this) {
    localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__["SESSION_TOKEN"]);
    localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__["ACCOUNT_STATE"]);
};
/* harmony export (immutable) */ __webpack_exports__["removeToken"] = removeToken;

const saveToken = function(token) {
    localStorage.setItem(__WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__["SESSION_TOKEN"], token);
    localStorage.setItem(__WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__["SESSION_EXPIRED"], 'date');
};
/* harmony export (immutable) */ __webpack_exports__["saveToken"] = saveToken;

const getToken = function(){
    var current = new Date();

    let token_expired = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__["SESSION_EXPIRED"]) || 'Now';

    if(token_expired!='Now' && token_expired < current){
        return ''
    }else{
        return localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__["SESSION_TOKEN"])
    }
}
/* harmony export (immutable) */ __webpack_exports__["getToken"] = getToken;

const saveUsername = function(username){
    localStorage.setItem(__WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__["USERNAME"], username);
}
/* harmony export (immutable) */ __webpack_exports__["saveUsername"] = saveUsername;

const getUsername = function(){
    return localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__["USERNAME"]);
}
/* harmony export (immutable) */ __webpack_exports__["getUsername"] = getUsername;


/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
let setip=''
if (true) {
 // setip = 'http://118.89.19.201'
  setip = 'http://localhost'
}else{
 setip = 'http://localhost'
}
const IP = setip
/* harmony export (immutable) */ __webpack_exports__["IP"] = IP;

const FLAG="APP_"
/* harmony export (immutable) */ __webpack_exports__["FLAG"] = FLAG;

const USERNAME = FLAG+'USERNAME'
/* harmony export (immutable) */ __webpack_exports__["USERNAME"] = USERNAME;
 //用户名
const SESSION_TOKEN = FLAG+'SESSION_TOKEN'
/* harmony export (immutable) */ __webpack_exports__["SESSION_TOKEN"] = SESSION_TOKEN;
 //token
const SESSION_EXPIRED = FLAG+'SESSION_EXPIRED'
/* harmony export (immutable) */ __webpack_exports__["SESSION_EXPIRED"] = SESSION_EXPIRED;
 //session过期时间
const ACCOUNT_STATE = FLAG+'ACCOUNT_STATE'
/* harmony export (immutable) */ __webpack_exports__["ACCOUNT_STATE"] = ACCOUNT_STATE;
 //账户状态
const TIMEOUT = 3000000;
/* harmony export (immutable) */ __webpack_exports__["TIMEOUT"] = TIMEOUT;
//超时时间
const HTTP_FAIL = "与服务器通信失败，请检查手机网络"
/* harmony export (immutable) */ __webpack_exports__["HTTP_FAIL"] = HTTP_FAIL;

const DATA_INVALID = "无法识别服务器返回的数据包"
/* harmony export (immutable) */ __webpack_exports__["DATA_INVALID"] = DATA_INVALID;

const DAY = 86399500
/* harmony export (immutable) */ __webpack_exports__["DAY"] = DAY;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PREDEFINED_CONSTANT_js__ = __webpack_require__(25);

__webpack_require__(95).polyfill();
var fetch = __webpack_require__(102);

var CODE = __webpack_require__(25).CODE
var CONFIG = __webpack_require__(118)



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
                console.log(123123)
                comb_data = Object.assign(data,{token:__WEBPACK_IMPORTED_MODULE_0__base_js__["getToken"]()})
            }
        }
        let root = this
        fetch(__WEBPACK_IMPORTED_MODULE_1__PREDEFINED_CONSTANT_js__["IP"]+':'+CONFIG.servePort+path,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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
/* harmony default export */ __webpack_exports__["a"] = mFetch;

/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 45 */,
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module_article_js__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module_floder_js__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__module_login_js__ = __webpack_require__(121);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ARTICLE", function() { return __WEBPACK_IMPORTED_MODULE_0__module_article_js__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "FLODER", function() { return __WEBPACK_IMPORTED_MODULE_1__module_floder_js__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "LOGIN", function() { return __WEBPACK_IMPORTED_MODULE_2__module_login_js__; });
// import mFetch from './ajax.js'
// 添加单词
// export const articleUpdate = function(title,content){
    
//     let data={
//         title,
//         content
//     }
//     return mFetch('/article/update'
//             ,data
//             )
// }






/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var verifyUserName = __webpack_require__(125).verifyUserName
var md5 = __webpack_require__(129)
var uid = __webpack_require__(130)
var throwError = __webpack_require__(124).throwError
var CONSTANT = __webpack_require__(123)
var DAY = CONSTANT.DAY
var CODE = CONSTANT.CODE
var VERIFY = __webpack_require__(126)
var CONFIG = __webpack_require__(122)
// 密码加密
function encryptPassword(password,salt){
    return md5(md5(password+salt))
}
//检查重复用户名
function* username_check(self,username){

    let username_query_filter = {
        username
    }
    // console.log('this.LOGIN_CONFIG',self.LOGIN_CONFIG)
    let res = yield self.mongo 
                    .db(self.LOGIN_CONFIG.dbname)
                    .collection('user')
                    .findOne(username_query_filter)

    // // console.log('res:',res)

    return res
}
function* regiest(next){
    let fields = this.request.fields
    // let fields = this.request.fields
    //验证码
    let username = fields.username
    let password = fields.password
    if(!VERIFY.loginVerify(username,password)){
        throwError(CODE.LOGIN_EMPTY)
    }
    //验证码检查
    // let verifycode = yield verify_code(this,fields.token,fields.verify_code)
    // // console.log('verifycode',verifycode)

    // 验证账号格式
    if(!verifyUserName(fields.username)){
        // throw new Error('账号格式不符合要求');
        throwError(CODE.USERNAME_INVALID)
    }
    // 验证密码格式


    // 验证账号重复性
    let _username = yield username_check(this,fields.username)

    // // console.log('_username：',_username)
    if(_username!=null){
        throwError(CODE.USERNAME_REPTER)
    }

    let salt = md5(Math.random()*1000000)
    password = encryptPassword(fields.password,salt)
    let now = new Date()

    let uid2 = uid(40)

    let data = {
        username:fields.username,
        password,
        salt,
        uid:uid2,
        regiest_date:now.getTime()
        // 弹性添加其它字段
    }
    // 账号写入数据库
    let _inset_res = yield this.mongo
                    .db(this.LOGIN_CONFIG.dbname)
                    .collection('user')
                    .insert(data)

    // // console.log('inset_res：',_inset_res)

    // 获取用于登录的token
    let temptoken = yield get_verifytoken(this)

    // 响应
    this.body = {
      status:true,
      res:_inset_res,
      temp_token:temptoken.token,
      temp_verifycode:temptoken.verify_code
    }
}
function* login(next){
    let fields = this.request.fields
    //验证码
    let username = fields.username
    let password = fields.password

    //密码参数基本判断 不允许密码为空
    if(!VERIFY.loginVerify(username,password)){
        throwError(CODE.LOGIN_EMPTY)
    }

    //获取 salt
    let salt = yield this.mongo
                        .db(this.LOGIN_CONFIG.dbname)
                        .collection('user')
                        .findOne({username:username})
    if(salt === null){
        throwError(CODE.USERNAME_NO_FIND)
    }
    // // console.log('salt，',salt)
    // // console.log('encryptPassword',encryptPassword(fields.password,salt.salt))
    //验证账号密码
    let _usm_pwd_filter = {
        username:username,
        password:encryptPassword(password,salt.salt)
    }
    // console.log('_usm_pwd_filter: ',_usm_pwd_filter)
    let _usm_pwd = yield this.mongo 
                        .db(this.LOGIN_CONFIG.dbname)
                        .collection('user')
                        .findOne(_usm_pwd_filter);
    // // console.log('_usm_pwd，',_usm_pwd)
    if(_usm_pwd === null){
        // throw new Error('账号密码错误')
        throwError(CODE.USERNAME_ERROR)
    }

    //token 写入有效状态
    let new_token = uid(40)
    let _token_stauts = {
        username:username,
        status:true,
        token:new_token
        // ,
        // device:fields.device
    }
    // console.log('new_token',new_token)
    //使旧 token 失效
    // 不使旧token失效，因为要支持多设备登录
    // let _remove_token = yield this.mongo
    //                             .db(this.LOGIN_CONFIG.dbname)
    //                             .collection('logined_token')
    //                             .update({
    //                                     username:fields.username,
    //                                     device:fields.device
    //                                 },
    //                                     {'$set':{status:false}},
    //                                     {'upsert':false})

    // // console.log('_remove_token: ',_remove_token)
    let _insert_res = yield this.mongo
                    .db(this.LOGIN_CONFIG.dbname)
                    .collection('logined_token')
                    .insert(_token_stauts)
    // // console.log('_insert_res',_insert_res)

    // 登录成功
    this.body = {
      status:true,
      token:new_token
    }
}
function* verifycode(next){

    let insert_res = yield get_verifytoken(this)

    this.body = {
      status:true,
      token:insert_res.token,
      verify_code:insert_res.verify_code
    }
}
function* get_verifytoken(self){
    // 生成 Token
    let token = uid(40)
    
    // 生成 验证码
    let verify_code = "123456"
    // 验证码转换为 base64 图片
    // Token，verify_code 存入数据库

    let now = new Date()
    let create_time = now.getTime()
    let expire_time = create_time + DAY*1
    let data = {
        token,
        verify_code,
        create_time,
        expire_time,
        is_verify:false
    }

    let res = yield self.mongo
                    .db(self.LOGIN_CONFIG.dbname)
                    .collection('token')
                    .insert(data)

    return {token,verify_code}
}
function* username_repeat(next){
    let _username = yield username_check(this,this.params.username)
    // // console.log('_username：',_username)
    if(_username!=null){
        throw new Error('账号重复');
    }
    this.body = {
        status:true
    }
}
//middleware
function login_check(){
    return function * plugin (next) {
        let token = this.request.fields.token
        let _login_check_res = yield this.mongo
                    .db(this.LOGIN_CONFIG.dbname)
                    .collection('logined_token')
                    .findOne({token:token})
        if(_login_check_res === null){
            // throw new Error('未登陆')
            throwError(CODE.LOGIN_NO_LOGIN)
        }
        if(_login_check_res.status === false){
            throwError(CODE.LOGIN_TOKEN_INVALID)
        }

        // // console.log('_login_check_res',_login_check_res)
        // 2016年11月28日17:55:51 todo：
        // _login_check_res.username
        // 获取 user 的资料
        let userinfo = yield this.mongo
                                .db(this.LOGIN_CONFIG.dbname)
                                .collection('user')
                                .findOne({username:_login_check_res.username})

       this.login_status = {
            uid:userinfo.uid
        }
        yield next
    } 
}
function verify_code(){
    return function*(next){
        let fields = this.request.fields
        let query_filter = {
            token:fields.token,
            verify_code:fields.verify_code.toString()
        }
        let _vc = yield this.mongo 
                            .db(this.LOGIN_CONFIG.dbname)
                            .collection('token')
                            .findOne(query_filter);
        // 验证验证码
        if(_vc==null){
            throwError(CODE.VERIFY_ERROR)
        }
        if(_vc.is_verify===true){
            throwError(CODE.VERIFY_INVALID)
        }
        let verifytoken = yield this.mongo
                                    .db(this.LOGIN_CONFIG.dbname)
                                    .collection('token')
                                    .update({token:fields.token},
                                        {'$set':{is_verify:true}})
        yield next
    }
}
function set(option){
    return function*(next){
        // console.log('option----------',option)
        this.LOGIN_CONFIG = {
            dbname: option.dbname || 'LOGINSERVER',
            port: option.port || 8200
        }
        // console.log('this.LOGIN_CONFIG------------',this.LOGIN_CONFIG)
        yield next
    }
}
module.exports = {
    regiest,
    login,
    verifycode,
    login_check,
    verify_code,
    username_repeat,
    set,
    CODE
}

/***/ }),
/* 48 */
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(27);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(115);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Hello = __webpack_require__(107);

var _Hello2 = _interopRequireDefault(_Hello);

var _WriteArticle = __webpack_require__(109);

var _WriteArticle2 = _interopRequireDefault(_WriteArticle);

var _Login = __webpack_require__(108);

var _Login2 = _interopRequireDefault(_Login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
exports.default = new _vueRouter2.default({
  routes: [{
    path: '/',
    name: 'Login',
    component: _Login2.default
  }, {
    path: '/WriteArticle',
    name: 'WriteArticle',
    component: _WriteArticle2.default
  }, {
    path: '/Login',
    name: 'Login',
    component: _Login2.default
  }]
});

/***/ }),
/* 50 */,
/* 51 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(99)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(52),
  /* template */
  __webpack_require__(111),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'app',
  data: function data() {
    return {
      count: 1
    };
  },

  computed: {
    count1: function count1() {
      return this.$store.state.count;
    }
  }
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(58);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return { localCount: 50 };
  },

  methods: (0, _extends3.default)({
    sub_addone: function sub_addone() {
      this.increment2();
    },
    addone: function addone() {
      this.promise2({ number: 33 });
    }
  }, (0, _vuex.mapActions)(['increment', 'promise2', 'increment2'])),
  computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(['doneTodos', 'doneTodosCount']), (0, _vuex.mapState)({
    count: function count(state) {
      return state.count;
    },
    submodule: function submodule(state) {
      return state.a;
    },
    countAlias: 'count',
    countPlusLocalState: function countPlusLocalState(state) {
      return state.count + this.localCount;
    }
  }))
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Count = __webpack_require__(106);

var _Count2 = _interopRequireDefault(_Count);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'hello',
  data: function data() {
    return {
      msg: 'Learn Vuex'
    };
  },

  components: {
    Counter: _Count2.default
  }
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = __webpack_require__(28);

var _regenerator2 = _interopRequireDefault(_regenerator);

__webpack_require__(98);

__webpack_require__(44);

__webpack_require__(96);

var _index = __webpack_require__(46);

var API = _interopRequireWildcard(_index);

var _base = __webpack_require__(14);

var BASE = _interopRequireWildcard(_base);

var _co = __webpack_require__(30);

var _co2 = _interopRequireDefault(_co);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGIN_CODE = __webpack_require__(47).CODE;

exports.default = {
	data: function data() {
		return {
			username: '',
			password: ''
		};
	},

	methods: {
		login: function login() {
			var self = this;
			API.LOGIN.login(this.username, this.password).then(function (res) {

				self.$root.username = BASE.getUsername();
				self.$router.push('WriteArticle');
			});
		},
		regiest: function regiest() {
			var self = this;
			(0, _co2.default)(_regenerator2.default.mark(function _callee() {
				var regiest_res, login;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return API.LOGIN.regiest(self.username, self.password);

							case 2:
								regiest_res = _context.sent;
								_context.next = 5;
								return API.LOGIN.login(self.username, self.password);

							case 5:
								login = _context.sent;


								self.$router.push('WriteArticle');

							case 7:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			})).catch(function () {});
		}
	},
	computed: {},
	created: function created() {
		var self = this;
		API.LOGIN.login_status_check().then(function (res) {
			console.log(res);
			self.$router.push('WriteArticle');
		}).catch(function (err) {
			console.log(err);
			if (err.STATUSCODE === LOGIN_CODE.LOGIN_NO_LOGIN.STATUSCODE) {
				localStorage.clear();
			}
		});
	},
	ready: function ready() {}
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(28);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _vuex = __webpack_require__(15);

__webpack_require__(44);

__webpack_require__(97);

var _index = __webpack_require__(46);

var API = _interopRequireWildcard(_index);

var _co = __webpack_require__(30);

var _co2 = _interopRequireDefault(_co);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGIN_CODE = __webpack_require__(47).CODE;

exports.default = {
    data: function data() {
        return {
            floder_list: [],
            floder_active: "",
            floder_edit_index: -1,
            floder_add_visible: false,
            floder_add_input: "",
            floder_item_more_crud_element_visible: false,
            article_list: [],
            article_active: "",
            article_edit_index: -1,
            article_add_visible: false,
            article_add_input: "",
            article_content: ""
        };
    },

    methods: {
        article_content_save: function article_content_save() {
            var self = this;
            (0, _co2.default)(_regenerator2.default.mark(function _callee() {
                var update;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return API.ARTICLE.update(self.article_content, self.article_active);

                            case 2:
                                update = _context.sent;

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            })).catch(function (err) {});
        },
        article_item_rename: function article_item_rename(index) {
            this.article_edit_index = index;
        },
        article_item_active: function article_item_active(index) {
            this.article_active = this.article_list[index].selfuid;

            var self = this;
            (0, _co2.default)(_regenerator2.default.mark(function _callee2() {
                var article_list;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return API.ARTICLE.content(self.article_active, self.article_active);

                            case 2:
                                article_list = _context2.sent;

                                console.log(article_list.result.content);
                                self.article_content = article_list.result.content;

                            case 5:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            })).catch(function (err) {});
        },
        article_edit_cancel: function article_edit_cancel(index) {
            this.article_edit_index = -1;
        },
        article_edit_ok: function article_edit_ok() {
            this.article_edit_index = -1;
        },

        article_add_show: function article_add_show() {
            this.article_add_visible = true;
        },
        article_add_ok: function article_add_ok() {
            var self = this;
            var floder_uid = self.floder_active;
            API.ARTICLE.add(this.article_add_input, floder_uid).then(function () {
                API.ARTICLE.list(floder_uid).then(function (res) {
                    self.article_list = res.result;
                });
                self.article_add_input = "";
            }).catch(function (err) {
                alert(err);
            });
            this.article_add_visible = false;
        },
        article_add_cancel: function article_add_cancel() {
            this.article_add_visible = false;
        },

        floder_item_more_crud_enter: function floder_item_more_crud_enter(event, index) {
            this.floder_item_more_crud_element_visible = true;
            this.$refs.floder_item_more.style.left = event.target.offsetLeft - 35 + "px";
            this.$refs.floder_item_more.style.top = event.target.offsetParent.offsetTop - 29 + "px";
        },
        floder_item_more_crud_out: function floder_item_more_crud_out(event, index) {
            this.floder_item_more_crud_element_visible = false;
        },
        floder_item_rename: function floder_item_rename(index) {
            this.floder_edit_index = index;
        },
        floder_item_active: function floder_item_active(index) {
            var self = this;
            (0, _co2.default)(_regenerator2.default.mark(function _callee3() {
                var article_list;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return API.ARTICLE.list(self.floder_list[index].floder_uid);

                            case 2:
                                article_list = _context3.sent;

                                self.article_list = article_list.result;

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            })).catch(function (err) {});
            this.floder_active = this.floder_list[index].floder_uid;
        },
        floder_edit_cancel: function floder_edit_cancel(index) {
            this.floder_edit_index = -1;
        },
        floder_edit_ok: function floder_edit_ok() {
            this.floder_edit_index = -1;
        },

        floder_add_show: function floder_add_show() {
            this.floder_add_visible = true;
        },
        floder_add_ok: function floder_add_ok() {
            var self = this;
            API.FLODER.add(this.floder_add_input).then(function () {
                API.FLODER.list().then(function (res) {
                    self.floder_list = res.result;
                });
                self.floder_add_input = "";
            }).catch(function (err) {
                alert(err);
            });
            this.floder_add_visible = false;
        },
        floder_add_cancel: function floder_add_cancel() {
            this.floder_add_visible = false;
        }
    },
    computed: {},
    created: function created() {
        var self = this;

        (0, _co2.default)(_regenerator2.default.mark(function _callee4() {
            var floder_list, article_list;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return API.FLODER.list();

                        case 2:
                            floder_list = _context4.sent;

                            self.floder_list = floder_list.result;
                            self.floder_active = floder_list.result[0].floder_uid;
                            _context4.next = 7;
                            return API.ARTICLE.list(self.floder_list[0].floder_uid);

                        case 7:
                            article_list = _context4.sent;

                            self.article_list = article_list.result;

                        case 9:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        })).catch(function (err) {
            if (err.STATUSCODE === LOGIN_CODE.LOGIN_NO_LOGIN.STATUSCODE) {
                self.$router.push('login');
            }
        });
    },
    mounted: function mounted() {
        var e = this.$refs.ta1;
        window.onresize = function () {
            e.style.height = window.innerHeight - 106 + "px";
        };
        e.style.height = window.innerHeight - 106 + "px";
    }
};

/***/ }),
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 97 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 98 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 99 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 100 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(53),
  /* template */
  __webpack_require__(112),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(100)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(54),
  /* template */
  __webpack_require__(113),
  /* scopeId */
  "data-v-58029bca",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(110),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(56),
  /* template */
  __webpack_require__(114),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login_wrap"
  }, [_c('div', {
    staticClass: "from"
  }, [_c('p', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.username),
      expression: "username"
    }],
    attrs: {
      "placeholder": "账号",
      "type": "text",
      "name": ""
    },
    domProps: {
      "value": (_vm.username)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.username = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('p', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.password),
      expression: "password"
    }],
    attrs: {
      "placeholder": "密码",
      "type": "password",
      "name": ""
    },
    domProps: {
      "value": (_vm.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.password = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "btn_wrap"
  }, [_c('a', {
    staticClass: "btn black",
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.login($event)
      }
    }
  }, [_vm._v("登陆")]), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_c('a', {
    attrs: {
      "href": ""
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.regiest($event)
      }
    }
  }, [_vm._v("直接注册并登陆")])])])])])
},staticRenderFns: []}

/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._v(_vm._s(_vm.countPlusLocalState) + "," + _vm._s(_vm.count) + "," + _vm._s(_vm.countAlias) + "\n\t"), _c('h1', [_vm._v("getter")]), _vm._v("\n\tdoneTodos:" + _vm._s(_vm.doneTodos) + "\n\t"), _c('br'), _vm._v("\n\tdoneTodosCount:" + _vm._s(_vm.doneTodosCount) + "\n\t"), _c('br'), _vm._v(" "), _c('a', {
    attrs: {
      "href": ""
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.addone($event)
      }
    }
  }, [_vm._v("mutations add one")]), _vm._v(" "), _c('br'), _vm._v("\n  sub_module" + _vm._s(_vm.submodule.count) + "\n  "), _c('a', {
    attrs: {
      "href": ""
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.sub_addone($event)
      }
    }
  }, [_vm._v("sub module add one")])])
},staticRenderFns: []}

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "hello"
  }, [_c('h1', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('counter')], 1)
},staticRenderFns: []}

/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "write_article_wrap"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.floder_item_more_crud_element_visible),
      expression: "floder_item_more_crud_element_visible"
    }],
    ref: "floder_item_more",
    staticClass: "floder-cover",
    attrs: {
      "id": "floder_item_more"
    },
    on: {
      "mouseleave": function($event) {
        _vm.floder_item_more_crud_out($event)
      }
    }
  }, [_c('div', {
    staticClass: "background"
  }), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('div', {
    staticClass: "floder"
  }, [_c('a', {
    staticClass: "btn back_home"
  }, [_vm._v("回到首页")]), _vm._v(" "), _c('p', {
    staticClass: "p_add",
    on: {
      "click": _vm.floder_add_show
    }
  }, [_c('i', {
    staticClass: "i_add"
  }, [_vm._v("+")]), _vm._v("新建文集")]), _vm._v(" "), (_vm.floder_add_visible) ? [_c('div', {
    staticClass: "add_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.floder_add_input),
      expression: "floder_add_input"
    }],
    attrs: {
      "placeholder": "输入文集名称",
      "type": "",
      "name": ""
    },
    domProps: {
      "value": (_vm.floder_add_input)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.floder_add_input = $event.target.value
      }
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "btn btn_ok",
    on: {
      "click": _vm.floder_add_ok
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('a', {
    staticClass: "btn btn_cancel",
    on: {
      "click": _vm.floder_add_cancel
    }
  }, [_vm._v("取消")])])] : _vm._e(), _vm._v(" "), _c('ul', {
    staticClass: "item"
  }, _vm._l((_vm.floder_list), function(item, index) {
    return _c('li', {
      class: {
        active: _vm.floder_active === _vm.floder_list[index].floder_uid, editor: _vm.floder_edit_index === index
      },
      on: {
        "click": function($event) {
          _vm.floder_item_active(index)
        }
      }
    }, [(index != _vm.floder_edit_index) ? [_vm._v("\n                    " + _vm._s(item.name) + "\n                   "), _vm._v(" "), _c('i', {
      staticClass: "iconfont icon-gengduo i1",
      on: {
        "click": function($event) {
          _vm.floder_item_more_crud_enter($event, index)
        }
      }
    })] : _vm._e(), _vm._v(" "), (index === _vm.floder_edit_index) ? [_c('input', {
      attrs: {
        "placeholder": item.name,
        "type": "",
        "name": ""
      }
    }), _vm._v(" "), _c('a', {
      staticClass: "btn btn_ok",
      on: {
        "click": _vm.floder_edit_ok
      }
    }, [_vm._v("保存")]), _vm._v(" "), _c('a', {
      staticClass: "btn btn_cancel",
      on: {
        "click": function($event) {
          _vm.floder_edit_cancel(index)
        }
      }
    }, [_vm._v("取消")])] : _vm._e()], 2)
  }))], 2), _vm._v(" "), _c('div', {
    staticClass: "document"
  }, [_c('p', {
    staticClass: "p_add",
    on: {
      "click": _vm.article_add_show
    }
  }, [_c('i', {
    staticClass: "i_add"
  }, [_vm._v("+")]), _vm._v("新建文章")]), _vm._v(" "), (_vm.article_add_visible) ? [_c('div', {
    staticClass: "add_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.article_add_input),
      expression: "article_add_input"
    }],
    attrs: {
      "placeholder": "输入文章名称",
      "type": "",
      "name": ""
    },
    domProps: {
      "value": (_vm.article_add_input)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.article_add_input = $event.target.value
      }
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "btn btn_ok",
    on: {
      "click": _vm.article_add_ok
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('a', {
    staticClass: "btn btn_cancel",
    on: {
      "click": _vm.article_add_cancel
    }
  }, [_vm._v("取消")])])] : _vm._e(), _vm._v(" "), _c('ul', [_vm._l((_vm.article_list), function(item, index) {
    return [_c('li', {
      class: {
        active: _vm.article_active === _vm.article_list[index].selfuid, editor: _vm.article_edit_index === index
      },
      on: {
        "click": function($event) {
          _vm.article_item_active(index)
        }
      }
    }, [_c('i', {
      staticClass: "i1"
    }), _vm._v(" "), _c('p', {
      staticClass: "p1"
    }, [_vm._v(_vm._s(item.title))]), _vm._v(" "), _c('p', {
      staticClass: "p2"
    }, [_vm._v("------")])])]
  })], 2)], 2), _vm._v(" "), _c('div', {
    staticClass: "article"
  }, [_c('input', {
    staticClass: "i1",
    attrs: {
      "type": "text",
      "placeholder": "无标题文章"
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_c('i', {
    staticClass: "iconfont icon-baocun i1",
    on: {
      "click": _vm.article_content_save
    }
  })]), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.article_content),
      expression: "article_content"
    }],
    ref: "ta1",
    attrs: {
      "name": "",
      "id": "ta1",
      "cols": "30",
      "rows": "10"
    },
    domProps: {
      "value": (_vm.article_content)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.article_content = $event.target.value
      }
    }
  })])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "subitem"
  }, [_c('li', [_c('i', {
    staticClass: "iconfont icon-xiugai"
  })]), _vm._v(" "), _c('li', [_c('i', {
    staticClass: "iconfont icon-shanchu"
  })])])
}]}

/***/ }),
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */
/***/ (function(module, exports) {

module.exports = {
    dbName:'DAILYS',
    dbPort:8201,
    servePort:8202
}

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_js__ = __webpack_require__(26);

// 新建文章
const add = function(title,floder_uid){
    
    let data={
        title,
        floder_uid
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/article/add'
            ,data
            )
}
/* harmony export (immutable) */ __webpack_exports__["add"] = add;

// 更新文章
const update = function(content,selfuid){
    
    let data={
        content,
        selfuid
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/article/update'
            ,data
            )
}
/* harmony export (immutable) */ __webpack_exports__["update"] = update;

// 查询文章
const content = function(selfuid){
    
    let data={
        selfuid
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/article/content'
            ,data
            )
}
/* harmony export (immutable) */ __webpack_exports__["content"] = content;

// 列表
const list = function(floder_uid){
    
    let data={
        floder_uid
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/article/list',data)
}
/* harmony export (immutable) */ __webpack_exports__["list"] = list;


/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_js__ = __webpack_require__(26);

// 新建文章
const add = function(name){
    let data={
        name
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/floder/add'
            ,data
            )
}
/* harmony export (immutable) */ __webpack_exports__["add"] = add;

// 列表
const list = function(){
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/floder/list',{})
}
/* harmony export (immutable) */ __webpack_exports__["list"] = list;


/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_md5__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_js__ = __webpack_require__(14);




const login = function(username,password){
    
    let data = {
        username,
        password:__WEBPACK_IMPORTED_MODULE_1_md5___default()(password),
        device:'html5'
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/login',data)
        .then(function(res){
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__base_js__["saveUsername"])(username)
            __WEBPACK_IMPORTED_MODULE_2__base_js__["saveToken"](res.token)
            return res
        })
}
/* harmony export (immutable) */ __webpack_exports__["login"] = login;

// 注册
const regiest = function(username,password){
    let data = {
        username,
        password:__WEBPACK_IMPORTED_MODULE_1_md5___default()(password)
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/regiest',
        data)
}
/* harmony export (immutable) */ __webpack_exports__["regiest"] = regiest;

// 测试登录状态
const login_status_check = function(){
    
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/login_status_check',{})
}
/* harmony export (immutable) */ __webpack_exports__["login_status_check"] = login_status_check;


/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = {
    dbname:'LOGINSERVER',
    port:8200
}

/***/ }),
/* 123 */
/***/ (function(module, exports) {

var STATUSCODE_START = 100
module.exports = {
    DAY:86399500,
    CODE:{
        VERIFY_INVALID:{
            STATUSCODE:STATUSCODE_START++,
            MSG:'验证码失效'
        },
        VERIFY_ERROR:{
            STATUSCODE:STATUSCODE_START++,
            MSG:'验证码错误'
        },
        LOGIN_TOKEN_INVALID:{
            STATUSCODE:STATUSCODE_START++,
            MSG:'登录超时'
        },
        LOGIN_NO_LOGIN:{
            STATUSCODE:STATUSCODE_START++,
            MSG:'未登录'
        },
        LOGIN_EMPTY:{
            STATUSCODE:STATUSCODE_START++,
            MSG:'账号或密码不能为空'
        },
        USERNAME_REPTER:{
            STATUSCODE:STATUSCODE_START++,
            MSG:'用户名重复'
        },
        USERNAME_INVALID:{
            STATUSCODE:STATUSCODE_START++,
            MSG:'账号格式不符合要求'
        },
        USERNAME_ERROR:{
            STATUSCODE:STATUSCODE_START++,
            MSG:'账号或密码错误'
        },
        USERNAME_NO_FIND:{
            STATUSCODE:STATUSCODE_START++,
            MSG:'没有找到此用户'
        }
    }
}


/***/ }),
/* 124 */
/***/ (function(module, exports) {

function throwError(obj,msg){
    let nObj = {
        STATUSCODE:obj.STATUSCODE,
        MSG:obj.MSG
    }
    if(msg != undefined){
        nObj.MSG = nObj.MSG + msg
    }
    throw new Error(JSON.stringify(nObj))
}
module.exports = {
    throwError
}

/***/ }),
/* 125 */
/***/ (function(module, exports) {

// 账号验证
var verifyUserName = function(username){
    return true
}
// 验证密码格式
var verfyPassword = function(password){
    return false
}
// 历史记录的添加

module.exports = {
    verifyUserName:verifyUserName,
    verfyPassword:verfyPassword
}


/***/ }),
/* 126 */
/***/ (function(module, exports) {

var isEmpty = function(val){
    if( val === undefined ||
        val === "" ||
        val === null){
        return true
    }
    return false
}
var loginVerify = function(username,password){
    if(isEmpty(username) || isEmpty(password)){
        return false
    }
    return true
}
module.exports = {
    loginVerify
}       

/***/ }),
/* 127 */
/***/ (function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),
/* 128 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__(127),
      utf8 = __webpack_require__(48).utf8,
      isBuffer = __webpack_require__(128),
      bin = __webpack_require__(48).bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),
/* 130 */
/***/ (function(module, exports) {

/**
 * Export `uid`
 */

module.exports = uid;

/**
 * Create a `uid`
 *
 * @param {String} len
 * @return {String} uid
 */

function uid(len) {
  len = len || 7;
  return Math.random().toString(35).substr(2, len);
}


/***/ }),
/* 131 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promise = __webpack_require__(50);

var _promise2 = _interopRequireDefault(_promise);

var _vue = __webpack_require__(27);

var _vue2 = _interopRequireDefault(_vue);

var _App = __webpack_require__(51);

var _App2 = _interopRequireDefault(_App);

var _router = __webpack_require__(49);

var _router2 = _interopRequireDefault(_router);

var _vuex = __webpack_require__(15);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);
var sub_module = {
  state: {
    count: 123123
  },
  mutations: {
    increment2: function increment2(state) {
      state.count++;
    }
  },
  getters: {
    doubleCount: function doubleCount(state, getters, rootState) {
      return state.count * 2;
    }
  },
  actions: {
    increment2: function increment2(_ref) {
      var state = _ref.state,
          commit = _ref.commit,
          rootState = _ref.rootState;

      commit('increment2');
    }
  }

};
var store = new _vuex2.default.Store({
  state: {
    count: 0,
    todos: [{ id: 1, text: '...', done: true }, { id: 2, text: '...', done: false }]
  },
  mutations: {
    increment: function increment(state, payload) {
      state.count += payload.number;
    }
  },
  getters: {
    doneTodos: function doneTodos(state) {
      return state.todos.filter(function (todo) {
        return todo.done;
      });
    },
    doneTodosCount: function doneTodosCount(state, getters) {
      return getters.doneTodos.length;
    }
  },
  actions: {
    increment: function increment(_ref2, payload) {
      var commit = _ref2.commit;

      setTimeout(function () {
        commit('increment', payload);
        setTimeout(function () {
          commit('increment', payload);
        }, 1000);
      }, 1000);
    },
    promise: function promise(_ref3, payload) {
      var commit = _ref3.commit;

      return new _promise2.default(function (resolve, reject) {
        setTimeout(function () {
          commit('increment', payload);
          resolve();
        }, 1000);
      });
    },
    promise2: function promise2(_ref4, payload) {
      var dispatch = _ref4.dispatch,
          commit = _ref4.commit;

      dispatch('promise', payload).then(function () {
        commit('increment', payload);
      });
    }
  },
  modules: {
    a: sub_module
  }
});
new _vue2.default({
  el: '#app',
  store: store,
  router: _router2.default,
  template: '<App/>',
  components: { App: _App2.default }
});

/***/ })
],[132]);
//# sourceMappingURL=app.0b12f296b26ca068c1a2.js.map