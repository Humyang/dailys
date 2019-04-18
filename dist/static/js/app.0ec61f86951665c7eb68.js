webpackJsonp([1,2],{

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__ = __webpack_require__(2);



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

/***/ 138:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 139:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 140:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 141:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
let setip=''
let Host1 = ''

// if (process.env.NODE_ENV === 'production') {
//  setip = 'http://118.89.19.201'
//   // setip = 'http://localhost'
// }else{
//  setip = 'http://localhost'
// }

if (true) {

  setip = 'http://dailys.api.dve2.com'
  Host1 = 'http://dailys.dve2.com'
 
 }else{
 
  setip = 'http://localhost:8202'
  // setip = 'http://dailys.api.dve2.com'
  Host1 = 'http://localhost:8090'
 }
const IP = setip
/* harmony export (immutable) */ __webpack_exports__["IP"] = IP;

const Host = Host1
/* harmony export (immutable) */ __webpack_exports__["Host"] = Host;






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

/***/ 20:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PREDEFINED_CONSTANT_js__ = __webpack_require__(2);

__webpack_require__(137).polyfill();
var fetch = __webpack_require__(321);

var CODE = __webpack_require__(2).CODE
var CONFIG = __webpack_require__(350)



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
                comb_data = Object.assign(data,{token:__WEBPACK_IMPORTED_MODULE_0__base_js__["getToken"]()})
            }
        }
        let root = this
        console.log('token')
        fetch(__WEBPACK_IMPORTED_MODULE_1__PREDEFINED_CONSTANT_js__["IP"]+path,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "_token":token || data.token || comb_data.token ||__WEBPACK_IMPORTED_MODULE_0__base_js__["getToken"]()||'unkonw'
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

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module_article_js__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module_floder_js__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__module_login_js__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__module_userCOnfig_js__ = __webpack_require__(355);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ARTICLE", function() { return __WEBPACK_IMPORTED_MODULE_0__module_article_js__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "FLODER", function() { return __WEBPACK_IMPORTED_MODULE_1__module_floder_js__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "LOGIN", function() { return __WEBPACK_IMPORTED_MODULE_2__module_login_js__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "CONFIG", function() { return __WEBPACK_IMPORTED_MODULE_3__module_userCOnfig_js__; });
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

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var SwitchF = function(s){
	// var s=Object.assign({
	// 	f1:function(){},
	// 	f2:function(){}
	// },settings);
	var flag = false
	return function(){
		if(!flag){
			console.log(1)
			s[0].call()
		}else{
			console.log(2)
			s[1].call()
		}
		flag=!flag
	}
}
/* harmony default export */ __webpack_exports__["default"] = SwitchF;

/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(86),
  /* template */
  __webpack_require__(339),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(87),
  /* template */
  __webpack_require__(343),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(141)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(88),
  /* template */
  __webpack_require__(344),
  /* scopeId */
  "data-v-58029bca",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(139)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(89),
  /* template */
  __webpack_require__(340),
  /* scopeId */
  "data-v-26306532",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(90),
  /* template */
  __webpack_require__(345),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(91),
  /* template */
  __webpack_require__(338),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(92),
  /* template */
  __webpack_require__(341),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 338:
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
  }), _vm._v(" "), _c('ul', {
    staticClass: "subitem"
  }, [_vm._m(0), _vm._v(" "), _c('li', {
    on: {
      "click": _vm.floder_delete
    }
  }, [_c('i', {
    staticClass: "iconfont icon-shanchu"
  })])])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.article_item_more_crud_element_visible),
      expression: "article_item_more_crud_element_visible"
    }],
    ref: "article_item_more",
    staticClass: "floder-cover",
    attrs: {
      "id": "article_item_more"
    },
    on: {
      "mouseleave": function($event) {
        _vm.article_item_more_crud_out($event)
      }
    }
  }, [_c('div', {
    staticClass: "background"
  }), _vm._v(" "), _c('ul', {
    staticClass: "subitem"
  }, [_vm._m(1), _vm._v(" "), _c('li', {
    on: {
      "click": _vm.article_delete
    }
  }, [_c('i', {
    staticClass: "iconfont icon-shanchu"
  })])])]), _vm._v(" "), (_vm.page_mode === 0) ? [_c('div', {
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
  }, [_vm._v("+")]), _vm._v("新建文集")]), _vm._v(" "), _c('p', {
    staticClass: "list_mode"
  }, [_c('i', {
    staticClass: "iconfont icon-zhankai",
    on: {
      "click": _vm.floder_mode_show
    }
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.floder_add_show_flag),
      expression: "floder_add_show_flag"
    }],
    staticClass: "list_mode_group"
  }, [_c('p', {
    staticClass: "p1"
  }, [_vm._v("文集排序方式")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.floder_mode_show_type),
      expression: "floder_mode_show_type"
    }],
    attrs: {
      "name": "",
      "id": ""
    },
    on: {
      "change": [function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.floder_mode_show_type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }, _vm.Mfloder_mode_show_type_change]
    }
  }, [_c('option', {
    attrs: {
      "value": "1"
    }
  }, [_vm._v("创建日期")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "2"
    }
  }, [_vm._v("最近使用")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "3"
    }
  }, [_vm._v("使用频率")])])]), _vm._v(" "), (_vm.floder_add_visible) ? [_c('div', {
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
  }, _vm._l((_vm.floder_list_computed), function(item, index) {
    return _c('li', {
      class: {
        active: _vm.floder_active === _vm.floder_list[index].floder_uid, editor: _vm.floder_edit_index === index
      },
      on: {
        "click": function($event) {
          _vm.floder_item_active(index)
        }
      }
    }, [(index != _vm.floder_edit_index) ? [_vm._v("\n                        " + _vm._s(index + 1 + '、' + item.name) + "\n                       "), _vm._v(" "), _c('i', {
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
    }, [_vm._v("------")]), _vm._v(" "), (_vm.article_edit_index === index) ? _c('i', {
      staticClass: "iconfont icon-gengduo i2",
      on: {
        "click": function($event) {
          _vm.article_item_more_crud_enter($event, index)
        }
      }
    }) : _vm._e()])]
  })], 2)], 2)] : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "article",
    class: {
      md_preview: _vm.page_mode === 1
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.article_title),
      expression: "article_title"
    }],
    staticClass: "i1",
    attrs: {
      "type": "text",
      "placeholder": "无标题文章"
    },
    domProps: {
      "value": (_vm.article_title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.article_title = $event.target.value
      }
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_c('i', {
    staticClass: "iconfont icon-shu i i2 ",
    on: {
      "click": _vm.article_markdown_preview
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-baocun i i1 animated",
    class: {
      saving: _vm.article_content_style.saving,
        changed: _vm.article_content_style.changed
    },
    on: {
      "click": _vm.article_content_execute
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-fabu i i2 ",
    on: {
      "click": _vm.article_markdown_preview
    }
  })]), _vm._v(" "), _c('textarea', {
    ref: "ta1",
    attrs: {
      "name": "",
      "id": "ta1",
      "cols": "30",
      "rows": "10"
    }
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.page_mode === 1),
      expression: "page_mode===1"
    }],
    staticClass: "markdown_parse_preview_wrap"
  }, [_c('div', {
    attrs: {
      "id": "markdown_parse_preview"
    },
    domProps: {
      "innerHTML": _vm._s(_vm.article_markdown_preview_text)
    }
  })])], 2)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('i', {
    staticClass: "iconfont icon-xiugai"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('i', {
    staticClass: "iconfont icon-xiugai"
  })])
}]}

/***/ }),

/***/ 339:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "write_article_wrap"
  }, [_c('textarea', {
    ref: "ta1",
    attrs: {
      "name": "",
      "id": "ta1",
      "cols": "30",
      "rows": "10"
    }
  })])
},staticRenderFns: []}

/***/ }),

/***/ 340:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "login"
    }
  }, [_c('p', [_vm._v("登陆中")])])
}]}

/***/ }),

/***/ 341:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "write_article_wrap"
  }, [_c('div', {
    staticStyle: {
      "height": "100%",
      "overflow": "auto"
    },
    attrs: {
      "id": "ta1"
    }
  })])
}]}

/***/ }),

/***/ 342:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),

/***/ 343:
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

/***/ 344:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "hello"
  }, [_c('h1', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('counter')], 1)
},staticRenderFns: []}

/***/ }),

/***/ 345:
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
  }), _vm._v(" "), _c('ul', {
    staticClass: "subitem"
  }, [_vm._m(0), _vm._v(" "), _c('li', {
    on: {
      "click": _vm.floder_delete
    }
  }, [_c('i', {
    staticClass: "iconfont icon-shanchu"
  })])])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.article_item_more_crud_element_visible),
      expression: "article_item_more_crud_element_visible"
    }],
    ref: "article_item_more",
    staticClass: "floder-cover",
    attrs: {
      "id": "article_item_more"
    },
    on: {
      "mouseleave": function($event) {
        _vm.article_item_more_crud_out($event)
      }
    }
  }, [_c('div', {
    staticClass: "background"
  }), _vm._v(" "), _c('ul', {
    staticClass: "subitem"
  }, [_vm._m(1), _vm._v(" "), _c('li', {
    on: {
      "click": _vm.article_delete
    }
  }, [_c('i', {
    staticClass: "iconfont icon-shanchu"
  })])])]), _vm._v(" "), (_vm.visible.treeview === 1) ? [_c('div', {
    staticClass: "floder"
  }, [_c('a', {
    staticClass: "btn back_home",
    attrs: {
      "href": "/"
    }
  }, [_vm._v("回到首页")]), _vm._v(" "), _c('p', {
    staticClass: "p_add",
    on: {
      "click": _vm.floder_add_show
    }
  }, [_c('i', {
    staticClass: "i_add"
  }, [_vm._v("+")]), _vm._v("新建文集\n      ")]), _vm._v(" "), _c('p', {
    staticClass: "list_mode"
  }, [_c('i', {
    staticClass: "iconfont icon-zhankai",
    on: {
      "click": _vm.floder_mode_show
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-icon1460187848267",
    on: {
      "click": _vm.search_mode_show
    }
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.floder_add_show_flag),
      expression: "floder_add_show_flag"
    }],
    staticClass: "list_mode_group"
  }, [_c('p', {
    staticClass: "p1"
  }, [_vm._v("文集排序方式")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.floder_mode_show_type),
      expression: "floder_mode_show_type"
    }],
    attrs: {
      "name": "",
      "id": ""
    },
    on: {
      "change": [function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.floder_mode_show_type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }, _vm.Mfloder_mode_show_type_change]
    }
  }, [_c('option', {
    attrs: {
      "value": "1"
    }
  }, [_vm._v("创建日期")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "2"
    }
  }, [_vm._v("最近使用")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "3"
    }
  }, [_vm._v("使用频率")])])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.search_mode_show_flag),
      expression: "search_mode_show_flag"
    }],
    staticClass: "list_mode_group"
  }, [_c('p', {
    staticClass: "p1"
  }, [_vm._v("搜索")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.search_mode_content),
      expression: "search_mode_content"
    }],
    staticClass: "search",
    attrs: {
      "type": "text",
      "placeholder": "搜索文集和文章"
    },
    domProps: {
      "value": (_vm.search_mode_content)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.search_mode_content = $event.target.value
      }
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "btn btn_ok",
    attrs: {
      "href": "#"
    },
    on: {
      "click": _vm.search_mode_ok
    }
  }, [_vm._v("确定")])]), _vm._v(" "), (_vm.floder_add_visible) ? [_c('div', {
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
  }, _vm._l((_vm.floder_list_computed), function(item, index) {
    return _c('li', {
      key: index,
      class: {
        active: _vm.floder_active === _vm.floder_list[index].floder_uid, editor: _vm.floder_edit_index === index
      },
      on: {
        "click": function($event) {
          _vm.floder_item_active(index)
        }
      }
    }, [(index != _vm.floder_edit_index) ? [_vm._v("\n            " + _vm._s(index + 1 + '、' + item.name) + "\n            "), _vm._v(" "), _c('i', {
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
  }, [_vm._v("+")]), _vm._v("新建文章\n      ")]), _vm._v(" "), (_vm.article_add_visible) ? [_c('div', {
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
      key: index,
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
    }, [_vm._v("------")]), _vm._v(" "), (_vm.article_edit_index === index) ? _c('i', {
      staticClass: "iconfont icon-gengduo i2",
      on: {
        "click": function($event) {
          _vm.article_item_more_crud_enter($event, index)
        }
      }
    }) : _vm._e()])]
  })], 2)], 2)] : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "article",
    class: {
      md_preview: _vm.visible.markdown === 1,
        full: _vm.visible.page_mode === 2
    }
  }, [(_vm.visible.page_mode != 2) ? _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.article_title),
      expression: "article_title"
    }],
    staticClass: "i1",
    attrs: {
      "type": "text",
      "placeholder": "无标题文章"
    },
    domProps: {
      "value": (_vm.article_title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.article_title = $event.target.value
      }
    }
  }) : _vm._e(), _vm._v(" "), _c('p', {
    staticClass: "p1"
  }, [_c('i', {
    staticClass: "iconfont icon-shu i i2",
    class: {
      active: _vm.visible.page_mode === 1
    },
    on: {
      "click": _vm.visible_editor_markdown
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-quanping i i2",
    class: {
      active: _vm.visible.page_mode === 2
    },
    on: {
      "click": _vm.visible_only_editor
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-quanping i i2",
    class: {
      active: _vm.visible.page_mode === 2
    },
    on: {
      "click": _vm.change_edtior
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-yijingfabu i i1 animated",
    on: {
      "click": _vm.article_deploy
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-baocun i i1 animated",
    class: {
      saving: _vm.article_content_style.saving,
        changed: _vm.article_content_style.changed
    },
    on: {
      "click": _vm.article_content_execute
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-fabu i i2",
    on: {
      "click": _vm.article_markdown_preview
    }
  })]), _vm._v(" "), (_vm.editorQuery === 'editor') ? _c('editor', {
    ref: "editor",
    attrs: {
      "data": _vm.article_content
    },
    on: {
      "save": _vm.article_content_save,
      "changed": function($event) {
        _vm.article_content_style.changed = true
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.editorQuery === 'codemirror') ? _c('editor-codemirror', {
    ref: "codemirror",
    attrs: {
      "data": _vm.article_content
    },
    on: {
      "save": _vm.article_content_save,
      "changed": function($event) {
        _vm.article_content_style.changed = true
      }
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.visible.markdown === 1 && _vm.editorQuery === 'codemirror'),
      expression: "visible.markdown===1 && editorQuery==='codemirror'"
    }],
    staticClass: "markdown_parse_preview_wrap"
  }, [_c('div', {
    attrs: {
      "id": "markdown_parse_preview"
    },
    domProps: {
      "innerHTML": _vm._s(_vm.article_markdown_preview_text)
    }
  })])], 2)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('i', {
    staticClass: "iconfont icon-xiugai"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('i', {
    staticClass: "iconfont icon-xiugai"
  })])
}]}

/***/ }),

/***/ 350:
/***/ (function(module, exports) {

module.exports = {
    dbName:'DAILYS',
    dbPort:8201,
    servePort:8202
}

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PREDEFINED_CONSTANT_js__ = __webpack_require__(2);
/*
封装的目的是什么？

1. 提取重复的代码。
2. 保持代码整洁。

上传事件有哪些重复代码？

1. 上传进度 通过参数传入回调
2. 上传完成 通过参数传入回调
3. 请求错误 通过参数传入回调
4. 中断请求 通过参数传入回调

*/



var Upload = function(options){

    var options = Object.assign({
      onSuccess:undefined,
      onError:undefined,
      onComplete:undefined,
      onProcess:undefined
    },options)

    this.serve_url = __WEBPACK_IMPORTED_MODULE_1__PREDEFINED_CONSTANT_js__["IP"] + "/upload"

    this.fd = new FormData();
    
    this.xhr = new XMLHttpRequest();

    // xhr.enctype = "multipart/form-data";
    //上传中设置上传的百分比
    this.xhr.upload.addEventListener("progress", function(evt){
        if (evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            if(options.onError!=undefined){
              options.onProcess(percentComplete)
            }
        }else {

        }
    }, false);
    //请求完成后执行的操作
    this.xhr.addEventListener("load", function(event){
        var obj = JSON.parse(event.target.responseText)
        if(obj.status == 1){
            if(options.onSuccess!=undefined){
              options.onSuccess(event)
            }
        }else{
            if(options.onError!=undefined){
              options.onError(event)
            }
        }
    }, false);
    //请求error
    this.xhr.addEventListener("error", function(event){
        if(options.onError!=undefined){
            options.onError(event)
        }
    }, false);
    //请求中断
    this.xhr.addEventListener("abort", function(event){
        if(options.onError!=undefined){
            options.onError(event)
        }
    }, false);
    //发送请求 服务器请求地址 

    
}
Upload.prototype.start = function(file){
  this.fd.append("file", file);
//   this.fd.append("token", BASE.getToken());
  
  this.xhr.open("post",this.serve_url,true);
  this.xhr.setRequestHeader('_token', __WEBPACK_IMPORTED_MODULE_0__base_js__["getToken"]());
  this.xhr.send(this.fd);
  this.fd.delete("file")
  this.fd.delete("token")
}
Upload.prototype.abort = function(){
  // 中断文件上传
} 

/* harmony default export */ __webpack_exports__["a"] = Upload;

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_js__ = __webpack_require__(26);

// 新建文章
const add = function(title,floder_uid){
    let timemap = (new Date()).getTime()
    let data={
        title,
        floder_uid,
        timemap
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/article/add'
            ,data
            )
}
/* harmony export (immutable) */ __webpack_exports__["add"] = add;

// 搜索文章
const search = function(keywords){
    let data={
        keywords
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/search'
            ,data
            )
}
/* harmony export (immutable) */ __webpack_exports__["search"] = search;

// 更新文章
const update = function(content,title,selfuid,floder_uid,editor){
    let timemap = (new Date()).getTime()
    let data={
        content,
        title,
        selfuid,
        floder_uid,
        timemap,
        editor
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/article/update'
            ,data
            )
}
/* harmony export (immutable) */ __webpack_exports__["update"] = update;

// 查询文章
const content = function(selfuid,editor){
    let data={
        selfuid,
        editor
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/article/content'
            ,data
            ).then(function(obj){
                if(!obj){
                    return obj
                }
                if(obj.result!=undefined && obj.result.content === undefined){
                    obj.result.content = ""
                }
                return obj
            })
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

// 列表
// 使用delete无法通过编译
const remove = function(selfuid){
    
    let data={
        selfuid
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/article/remove',data)
}
/* harmony export (immutable) */ __webpack_exports__["remove"] = remove;

// 发布文章
const deploy = function(selfuid){
    let data={
        selfuid
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/deploy/update',data)
}
/* harmony export (immutable) */ __webpack_exports__["deploy"] = deploy;


/***/ }),

/***/ 353:
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

const remove = function(floder_uid){
    let data={
        floder_uid
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/floder/remove'
            ,data
            )
}
/* harmony export (immutable) */ __webpack_exports__["remove"] = remove;



/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_md5__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_js__ = __webpack_require__(12);




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
const login_status_check = function(token){
    
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/login_status_check',{token})
}
/* harmony export (immutable) */ __webpack_exports__["login_status_check"] = login_status_check;


/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_js__ = __webpack_require__(26);


const floder_sort_type = function(type){
    let data = {
        type
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/config/floder_sort_type_update',data)
}
/* harmony export (immutable) */ __webpack_exports__["floder_sort_type"] = floder_sort_type;

const getAll = function(){
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])('/config/getAll',{})
}
/* harmony export (immutable) */ __webpack_exports__["getAll"] = getAll;


/***/ }),

/***/ 356:
/***/ (function(module, exports) {

/**
 * Diff Match and Patch
 *
 * Copyright 2006 Google Inc.
 * http://code.google.com/p/google-diff-match-patch/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Computes the difference between two texts to create a patch.
 * Applies the patch onto another text, allowing for errors.
 * @author fraser@google.com (Neil Fraser)
 */

/**
 * Class containing the diff, match and patch methods.
 * @constructor
 */
function diff_match_patch() {

  // Defaults.
  // Redefine these in your program to override the defaults.

  // Number of seconds to map a diff before giving up (0 for infinity).
  this.Diff_Timeout = 1.0;
  // Cost of an empty edit operation in terms of edit characters.
  this.Diff_EditCost = 4;
  // At what point is no match declared (0.0 = perfection, 1.0 = very loose).
  this.Match_Threshold = 0.5;
  // How far to search for a match (0 = exact location, 1000+ = broad match).
  // A match this many characters away from the expected location will add
  // 1.0 to the score (0.0 is a perfect match).
  this.Match_Distance = 1000;
  // When deleting a large block of text (over ~64 characters), how close do
  // the contents have to be to match the expected contents. (0.0 = perfection,
  // 1.0 = very loose).  Note that Match_Threshold controls how closely the
  // end points of a delete need to match.
  this.Patch_DeleteThreshold = 0.5;
  // Chunk size for context length.
  this.Patch_Margin = 4;

  // The number of bits in an int.
  this.Match_MaxBits = 32;
}


//  DIFF FUNCTIONS


/**
 * The data structure representing a diff is an array of tuples:
 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
 */
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;

/** @typedef {{0: number, 1: string}} */
diff_match_patch.Diff;


/**
 * Find the differences between two texts.  Simplifies the problem by stripping
 * any common prefix or suffix off the texts before diffing.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {boolean=} opt_checklines Optional speedup flag. If present and false,
 *     then don't run a line-level diff first to identify the changed areas.
 *     Defaults to true, which does a faster, slightly less optimal diff.
 * @param {number} opt_deadline Optional time when the diff should be complete
 *     by.  Used internally for recursive calls.  Users should set DiffTimeout
 *     instead.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 */
diff_match_patch.prototype.diff_main = function(text1, text2, opt_checklines,
    opt_deadline) {
  // Set a deadline by which time the diff must be complete.
  if (typeof opt_deadline == 'undefined') {
    if (this.Diff_Timeout <= 0) {
      opt_deadline = Number.MAX_VALUE;
    } else {
      opt_deadline = (new Date).getTime() + this.Diff_Timeout * 1000;
    }
  }
  var deadline = opt_deadline;

  // Check for null inputs.
  if (text1 == null || text2 == null) {
    throw new Error('Null input. (diff_main)');
  }

  // Check for equality (speedup).
  if (text1 == text2) {
    if (text1) {
      return [[DIFF_EQUAL, text1]];
    }
    return [];
  }

  if (typeof opt_checklines == 'undefined') {
    opt_checklines = true;
  }
  var checklines = opt_checklines;

  // Trim off common prefix (speedup).
  var commonlength = this.diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);

  // Trim off common suffix (speedup).
  commonlength = this.diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);

  // Compute the diff on the middle block.
  var diffs = this.diff_compute_(text1, text2, checklines, deadline);

  // Restore the prefix and suffix.
  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }
  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }
  this.diff_cleanupMerge(diffs);
  return diffs;
};


/**
 * Find the differences between two texts.  Assumes that the texts do not
 * have any common prefix or suffix.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {boolean} checklines Speedup flag.  If false, then don't run a
 *     line-level diff first to identify the changed areas.
 *     If true, then run a faster, slightly less optimal diff.
 * @param {number} deadline Time when the diff should be complete by.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_compute_ = function(text1, text2, checklines,
    deadline) {
  var diffs;

  if (!text1) {
    // Just add some text (speedup).
    return [[DIFF_INSERT, text2]];
  }

  if (!text2) {
    // Just delete some text (speedup).
    return [[DIFF_DELETE, text1]];
  }

  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);
  if (i != -1) {
    // Shorter text is inside the longer text (speedup).
    diffs = [[DIFF_INSERT, longtext.substring(0, i)],
             [DIFF_EQUAL, shorttext],
             [DIFF_INSERT, longtext.substring(i + shorttext.length)]];
    // Swap insertions for deletions if diff is reversed.
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }

  if (shorttext.length == 1) {
    // Single character string.
    // After the previous speedup, the character can't be an equality.
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  }

  // Check to see if the problem can be split in two.
  var hm = this.diff_halfMatch_(text1, text2);
  if (hm) {
    // A half-match was found, sort out the return data.
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];
    // Send both pairs off for separate processing.
    var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
    var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
    // Merge the results.
    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
  }

  if (checklines && text1.length > 100 && text2.length > 100) {
    return this.diff_lineMode_(text1, text2, deadline);
  }

  return this.diff_bisect_(text1, text2, deadline);
};


/**
 * Do a quick line-level diff on both strings, then rediff the parts for
 * greater accuracy.
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} deadline Time when the diff should be complete by.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_lineMode_ = function(text1, text2, deadline) {
  // Scan the text on a line-by-line basis first.
  var a = this.diff_linesToChars_(text1, text2);
  text1 = a.chars1;
  text2 = a.chars2;
  var linearray = a.lineArray;

  var diffs = this.diff_main(text1, text2, false, deadline);

  // Convert the diff back to original text.
  this.diff_charsToLines_(diffs, linearray);
  // Eliminate freak matches (e.g. blank lines)
  this.diff_cleanupSemantic(diffs);

  // Rediff any replacement blocks, this time character-by-character.
  // Add a dummy entry at the end.
  diffs.push([DIFF_EQUAL, '']);
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete >= 1 && count_insert >= 1) {
          // Delete the offending records and add the merged ones.
          diffs.splice(pointer - count_delete - count_insert,
                       count_delete + count_insert);
          pointer = pointer - count_delete - count_insert;
          var a = this.diff_main(text_delete, text_insert, false, deadline);
          for (var j = a.length - 1; j >= 0; j--) {
            diffs.splice(pointer, 0, a[j]);
          }
          pointer = pointer + a.length;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
    pointer++;
  }
  diffs.pop();  // Remove the dummy entry at the end.

  return diffs;
};


/**
 * Find the 'middle snake' of a diff, split the problem in two
 * and return the recursively constructed diff.
 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} deadline Time at which to bail if not yet complete.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_bisect_ = function(text1, text2, deadline) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  var max_d = Math.ceil((text1_length + text2_length) / 2);
  var v_offset = max_d;
  var v_length = 2 * max_d;
  var v1 = new Array(v_length);
  var v2 = new Array(v_length);
  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
  // integers and undefined.
  for (var x = 0; x < v_length; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }
  v1[v_offset + 1] = 0;
  v2[v_offset + 1] = 0;
  var delta = text1_length - text2_length;
  // If the total number of characters is odd, then the front path will collide
  // with the reverse path.
  var front = (delta % 2 != 0);
  // Offsets for start and end of k loop.
  // Prevents mapping of space beyond the grid.
  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;
  for (var d = 0; d < max_d; d++) {
    // Bail out if deadline is reached.
    if ((new Date()).getTime() > deadline) {
      break;
    }

    // Walk the front path one step.
    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      var k1_offset = v_offset + k1;
      var x1;
      if (k1 == -d || (k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
        x1 = v1[k1_offset + 1];
      } else {
        x1 = v1[k1_offset - 1] + 1;
      }
      var y1 = x1 - k1;
      while (x1 < text1_length && y1 < text2_length &&
             text1.charAt(x1) == text2.charAt(y1)) {
        x1++;
        y1++;
      }
      v1[k1_offset] = x1;
      if (x1 > text1_length) {
        // Ran off the right of the graph.
        k1end += 2;
      } else if (y1 > text2_length) {
        // Ran off the bottom of the graph.
        k1start += 2;
      } else if (front) {
        var k2_offset = v_offset + delta - k1;
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
          // Mirror x2 onto top-left coordinate system.
          var x2 = text1_length - v2[k2_offset];
          if (x1 >= x2) {
            // Overlap detected.
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
          }
        }
      }
    }

    // Walk the reverse path one step.
    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      var k2_offset = v_offset + k2;
      var x2;
      if (k2 == -d || (k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
        x2 = v2[k2_offset + 1];
      } else {
        x2 = v2[k2_offset - 1] + 1;
      }
      var y2 = x2 - k2;
      while (x2 < text1_length && y2 < text2_length &&
             text1.charAt(text1_length - x2 - 1) ==
             text2.charAt(text2_length - y2 - 1)) {
        x2++;
        y2++;
      }
      v2[k2_offset] = x2;
      if (x2 > text1_length) {
        // Ran off the left of the graph.
        k2end += 2;
      } else if (y2 > text2_length) {
        // Ran off the top of the graph.
        k2start += 2;
      } else if (!front) {
        var k1_offset = v_offset + delta - k2;
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
          var x1 = v1[k1_offset];
          var y1 = v_offset + x1 - k1_offset;
          // Mirror x2 onto top-left coordinate system.
          x2 = text1_length - x2;
          if (x1 >= x2) {
            // Overlap detected.
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
          }
        }
      }
    }
  }
  // Diff took too long and hit the deadline or
  // number of diffs equals number of characters, no commonality at all.
  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
};


/**
 * Given the location of the 'middle snake', split the diff in two parts
 * and recurse.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} x Index of split point in text1.
 * @param {number} y Index of split point in text2.
 * @param {number} deadline Time at which to bail if not yet complete.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_bisectSplit_ = function(text1, text2, x, y,
    deadline) {
  var text1a = text1.substring(0, x);
  var text2a = text2.substring(0, y);
  var text1b = text1.substring(x);
  var text2b = text2.substring(y);

  // Compute both diffs serially.
  var diffs = this.diff_main(text1a, text2a, false, deadline);
  var diffsb = this.diff_main(text1b, text2b, false, deadline);

  return diffs.concat(diffsb);
};


/**
 * Split two texts into an array of strings.  Reduce the texts to a string of
 * hashes where each Unicode character represents one line.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {{chars1: string, chars2: string, lineArray: !Array.<string>}}
 *     An object containing the encoded text1, the encoded text2 and
 *     the array of unique strings.
 *     The zeroth element of the array of unique strings is intentionally blank.
 * @private
 */
diff_match_patch.prototype.diff_linesToChars_ = function(text1, text2) {
  var lineArray = [];  // e.g. lineArray[4] == 'Hello\n'
  var lineHash = {};   // e.g. lineHash['Hello\n'] == 4

  // '\x00' is a valid character, but various debuggers don't like it.
  // So we'll insert a junk entry to avoid generating a null character.
  lineArray[0] = '';

  /**
   * Split a text into an array of strings.  Reduce the texts to a string of
   * hashes where each Unicode character represents one line.
   * Modifies linearray and linehash through being a closure.
   * @param {string} text String to encode.
   * @return {string} Encoded string.
   * @private
   */
  function diff_linesToCharsMunge_(text) {
    var chars = '';
    // Walk the text, pulling out a substring for each line.
    // text.split('\n') would would temporarily double our memory footprint.
    // Modifying text would create many large strings to garbage collect.
    var lineStart = 0;
    var lineEnd = -1;
    // Keeping our own length variable is faster than looking it up.
    var lineArrayLength = lineArray.length;
    while (lineEnd < text.length - 1) {
      lineEnd = text.indexOf('\n', lineStart);
      if (lineEnd == -1) {
        lineEnd = text.length - 1;
      }
      var line = text.substring(lineStart, lineEnd + 1);
      lineStart = lineEnd + 1;

      if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) :
          (lineHash[line] !== undefined)) {
        chars += String.fromCharCode(lineHash[line]);
      } else {
        chars += String.fromCharCode(lineArrayLength);
        lineHash[line] = lineArrayLength;
        lineArray[lineArrayLength++] = line;
      }
    }
    return chars;
  }

  var chars1 = diff_linesToCharsMunge_(text1);
  var chars2 = diff_linesToCharsMunge_(text2);
  return {chars1: chars1, chars2: chars2, lineArray: lineArray};
};


/**
 * Rehydrate the text in a diff from a string of line hashes to real lines of
 * text.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @param {!Array.<string>} lineArray Array of unique strings.
 * @private
 */
diff_match_patch.prototype.diff_charsToLines_ = function(diffs, lineArray) {
  for (var x = 0; x < diffs.length; x++) {
    var chars = diffs[x][1];
    var text = [];
    for (var y = 0; y < chars.length; y++) {
      text[y] = lineArray[chars.charCodeAt(y)];
    }
    diffs[x][1] = text.join('');
  }
};


/**
 * Determine the common prefix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the start of each
 *     string.
 */
diff_match_patch.prototype.diff_commonPrefix = function(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (text1.substring(pointerstart, pointermid) ==
        text2.substring(pointerstart, pointermid)) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Determine the common suffix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of each string.
 */
diff_match_patch.prototype.diff_commonSuffix = function(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 ||
      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
        text2.substring(text2.length - pointermid, text2.length - pointerend)) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Determine if the suffix of one string is the prefix of another.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of the first
 *     string and the start of the second string.
 * @private
 */
diff_match_patch.prototype.diff_commonOverlap_ = function(text1, text2) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  // Eliminate the null case.
  if (text1_length == 0 || text2_length == 0) {
    return 0;
  }
  // Truncate the longer string.
  if (text1_length > text2_length) {
    text1 = text1.substring(text1_length - text2_length);
  } else if (text1_length < text2_length) {
    text2 = text2.substring(0, text1_length);
  }
  var text_length = Math.min(text1_length, text2_length);
  // Quick check for the worst case.
  if (text1 == text2) {
    return text_length;
  }

  // Start by looking for a single character match
  // and increase length until no match is found.
  // Performance analysis: http://neil.fraser.name/news/2010/11/04/
  var best = 0;
  var length = 1;
  while (true) {
    var pattern = text1.substring(text_length - length);
    var found = text2.indexOf(pattern);
    if (found == -1) {
      return best;
    }
    length += found;
    if (found == 0 || text1.substring(text_length - length) ==
        text2.substring(0, length)) {
      best = length;
      length++;
    }
  }
};


/**
 * Do the two texts share a substring which is at least half the length of the
 * longer text?
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {Array.<string>} Five element Array, containing the prefix of
 *     text1, the suffix of text1, the prefix of text2, the suffix of
 *     text2 and the common middle.  Or null if there was no match.
 * @private
 */
diff_match_patch.prototype.diff_halfMatch_ = function(text1, text2) {
  if (this.Diff_Timeout <= 0) {
    // Don't risk returning a non-optimal diff if we have unlimited time.
    return null;
  }
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null;  // Pointless.
  }
  var dmp = this;  // 'this' becomes 'window' in a closure.

  /**
   * Does a substring of shorttext exist within longtext such that the substring
   * is at least half the length of longtext?
   * Closure, but does not reference any external variables.
   * @param {string} longtext Longer string.
   * @param {string} shorttext Shorter string.
   * @param {number} i Start index of quarter length substring within longtext.
   * @return {Array.<string>} Five element Array, containing the prefix of
   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
   *     of shorttext and the common middle.  Or null if there was no match.
   * @private
   */
  function diff_halfMatchI_(longtext, shorttext, i) {
    // Start with a 1/4 length substring at position i as a seed.
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    var j = -1;
    var best_common = '';
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
      var prefixLength = dmp.diff_commonPrefix(longtext.substring(i),
                                               shorttext.substring(j));
      var suffixLength = dmp.diff_commonSuffix(longtext.substring(0, i),
                                               shorttext.substring(0, j));
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext.substring(j - suffixLength, j) +
            shorttext.substring(j, j + prefixLength);
        best_longtext_a = longtext.substring(0, i - suffixLength);
        best_longtext_b = longtext.substring(i + prefixLength);
        best_shorttext_a = shorttext.substring(0, j - suffixLength);
        best_shorttext_b = shorttext.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext.length) {
      return [best_longtext_a, best_longtext_b,
              best_shorttext_a, best_shorttext_b, best_common];
    } else {
      return null;
    }
  }

  // First check if the second quarter is the seed for a half-match.
  var hm1 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 4));
  // Check again based on the third quarter.
  var hm2 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 2));
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    // Both matched.  Select the longest.
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }

  // A half-match was found, sort out the return data.
  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
};


/**
 * Reduce the number of edits by eliminating semantically trivial equalities.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupSemantic = function(diffs) {
  var changes = false;
  var equalities = [];  // Stack of indices where equalities are found.
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  /** @type {?string} */
  var lastequality = null;
  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
  var pointer = 0;  // Index of current position.
  // Number of characters that changed prior to the equality.
  var length_insertions1 = 0;
  var length_deletions1 = 0;
  // Number of characters that changed after the equality.
  var length_insertions2 = 0;
  var length_deletions2 = 0;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
      equalities[equalitiesLength++] = pointer;
      length_insertions1 = length_insertions2;
      length_deletions1 = length_deletions2;
      length_insertions2 = 0;
      length_deletions2 = 0;
      lastequality = diffs[pointer][1];
    } else {  // An insertion or deletion.
      if (diffs[pointer][0] == DIFF_INSERT) {
        length_insertions2 += diffs[pointer][1].length;
      } else {
        length_deletions2 += diffs[pointer][1].length;
      }
      // Eliminate an equality that is smaller or equal to the edits on both
      // sides of it.
      if (lastequality && (lastequality.length <=
          Math.max(length_insertions1, length_deletions1)) &&
          (lastequality.length <= Math.max(length_insertions2,
                                           length_deletions2))) {
        // Duplicate record.
        diffs.splice(equalities[equalitiesLength - 1], 0,
                     [DIFF_DELETE, lastequality]);
        // Change second copy to insert.
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        // Throw away the equality we just deleted.
        equalitiesLength--;
        // Throw away the previous equality (it needs to be reevaluated).
        equalitiesLength--;
        pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
        length_insertions1 = 0;  // Reset the counters.
        length_deletions1 = 0;
        length_insertions2 = 0;
        length_deletions2 = 0;
        lastequality = null;
        changes = true;
      }
    }
    pointer++;
  }

  // Normalize the diff.
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
  this.diff_cleanupSemanticLossless(diffs);

  // Find any overlaps between deletions and insertions.
  // e.g: <del>abcxxx</del><ins>xxxdef</ins>
  //   -> <del>abc</del>xxx<ins>def</ins>
  // e.g: <del>xxxabc</del><ins>defxxx</ins>
  //   -> <ins>def</ins>xxx<del>abc</del>
  // Only extract an overlap if it is as big as the edit ahead or behind it.
  pointer = 1;
  while (pointer < diffs.length) {
    if (diffs[pointer - 1][0] == DIFF_DELETE &&
        diffs[pointer][0] == DIFF_INSERT) {
      var deletion = diffs[pointer - 1][1];
      var insertion = diffs[pointer][1];
      var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
      var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
      if (overlap_length1 >= overlap_length2) {
        if (overlap_length1 >= deletion.length / 2 ||
            overlap_length1 >= insertion.length / 2) {
          // Overlap found.  Insert an equality and trim the surrounding edits.
          diffs.splice(pointer, 0,
              [DIFF_EQUAL, insertion.substring(0, overlap_length1)]);
          diffs[pointer - 1][1] =
              deletion.substring(0, deletion.length - overlap_length1);
          diffs[pointer + 1][1] = insertion.substring(overlap_length1);
          pointer++;
        }
      } else {
        if (overlap_length2 >= deletion.length / 2 ||
            overlap_length2 >= insertion.length / 2) {
          // Reverse overlap found.
          // Insert an equality and swap and trim the surrounding edits.
          diffs.splice(pointer, 0,
              [DIFF_EQUAL, deletion.substring(0, overlap_length2)]);
          diffs[pointer - 1][0] = DIFF_INSERT;
          diffs[pointer - 1][1] =
              insertion.substring(0, insertion.length - overlap_length2);
          diffs[pointer + 1][0] = DIFF_DELETE;
          diffs[pointer + 1][1] =
              deletion.substring(overlap_length2);
          pointer++;
        }
      }
      pointer++;
    }
    pointer++;
  }
};


/**
 * Look for single edits surrounded on both sides by equalities
 * which can be shifted sideways to align the edit to a word boundary.
 * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupSemanticLossless = function(diffs) {
  /**
   * Given two strings, compute a score representing whether the internal
   * boundary falls on logical boundaries.
   * Scores range from 6 (best) to 0 (worst).
   * Closure, but does not reference any external variables.
   * @param {string} one First string.
   * @param {string} two Second string.
   * @return {number} The score.
   * @private
   */
  function diff_cleanupSemanticScore_(one, two) {
    if (!one || !two) {
      // Edges are the best.
      return 6;
    }

    // Each port of this function behaves slightly differently due to
    // subtle differences in each language's definition of things like
    // 'whitespace'.  Since this function's purpose is largely cosmetic,
    // the choice has been made to use each language's native features
    // rather than force total conformity.
    var char1 = one.charAt(one.length - 1);
    var char2 = two.charAt(0);
    var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
    var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
    var whitespace1 = nonAlphaNumeric1 &&
        char1.match(diff_match_patch.whitespaceRegex_);
    var whitespace2 = nonAlphaNumeric2 &&
        char2.match(diff_match_patch.whitespaceRegex_);
    var lineBreak1 = whitespace1 &&
        char1.match(diff_match_patch.linebreakRegex_);
    var lineBreak2 = whitespace2 &&
        char2.match(diff_match_patch.linebreakRegex_);
    var blankLine1 = lineBreak1 &&
        one.match(diff_match_patch.blanklineEndRegex_);
    var blankLine2 = lineBreak2 &&
        two.match(diff_match_patch.blanklineStartRegex_);

    if (blankLine1 || blankLine2) {
      // Five points for blank lines.
      return 5;
    } else if (lineBreak1 || lineBreak2) {
      // Four points for line breaks.
      return 4;
    } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
      // Three points for end of sentences.
      return 3;
    } else if (whitespace1 || whitespace2) {
      // Two points for whitespace.
      return 2;
    } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
      // One point for non-alphanumeric.
      return 1;
    }
    return 0;
  }

  var pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      var equality1 = diffs[pointer - 1][1];
      var edit = diffs[pointer][1];
      var equality2 = diffs[pointer + 1][1];

      // First, shift the edit as far left as possible.
      var commonOffset = this.diff_commonSuffix(equality1, edit);
      if (commonOffset) {
        var commonString = edit.substring(edit.length - commonOffset);
        equality1 = equality1.substring(0, equality1.length - commonOffset);
        edit = commonString + edit.substring(0, edit.length - commonOffset);
        equality2 = commonString + equality2;
      }

      // Second, step character by character right, looking for the best fit.
      var bestEquality1 = equality1;
      var bestEdit = edit;
      var bestEquality2 = equality2;
      var bestScore = diff_cleanupSemanticScore_(equality1, edit) +
          diff_cleanupSemanticScore_(edit, equality2);
      while (edit.charAt(0) === equality2.charAt(0)) {
        equality1 += edit.charAt(0);
        edit = edit.substring(1) + equality2.charAt(0);
        equality2 = equality2.substring(1);
        var score = diff_cleanupSemanticScore_(equality1, edit) +
            diff_cleanupSemanticScore_(edit, equality2);
        // The >= encourages trailing rather than leading whitespace on edits.
        if (score >= bestScore) {
          bestScore = score;
          bestEquality1 = equality1;
          bestEdit = edit;
          bestEquality2 = equality2;
        }
      }

      if (diffs[pointer - 1][1] != bestEquality1) {
        // We have an improvement, save it back to the diff.
        if (bestEquality1) {
          diffs[pointer - 1][1] = bestEquality1;
        } else {
          diffs.splice(pointer - 1, 1);
          pointer--;
        }
        diffs[pointer][1] = bestEdit;
        if (bestEquality2) {
          diffs[pointer + 1][1] = bestEquality2;
        } else {
          diffs.splice(pointer + 1, 1);
          pointer--;
        }
      }
    }
    pointer++;
  }
};

// Define some regex patterns for matching boundaries.
diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
diff_match_patch.whitespaceRegex_ = /\s/;
diff_match_patch.linebreakRegex_ = /[\r\n]/;
diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;

/**
 * Reduce the number of edits by eliminating operationally trivial equalities.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {
  var changes = false;
  var equalities = [];  // Stack of indices where equalities are found.
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  /** @type {?string} */
  var lastequality = null;
  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
  var pointer = 0;  // Index of current position.
  // Is there an insertion operation before the last equality.
  var pre_ins = false;
  // Is there a deletion operation before the last equality.
  var pre_del = false;
  // Is there an insertion operation after the last equality.
  var post_ins = false;
  // Is there a deletion operation after the last equality.
  var post_del = false;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
      if (diffs[pointer][1].length < this.Diff_EditCost &&
          (post_ins || post_del)) {
        // Candidate found.
        equalities[equalitiesLength++] = pointer;
        pre_ins = post_ins;
        pre_del = post_del;
        lastequality = diffs[pointer][1];
      } else {
        // Not a candidate, and can never become one.
        equalitiesLength = 0;
        lastequality = null;
      }
      post_ins = post_del = false;
    } else {  // An insertion or deletion.
      if (diffs[pointer][0] == DIFF_DELETE) {
        post_del = true;
      } else {
        post_ins = true;
      }
      /*
       * Five types to be split:
       * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
       * <ins>A</ins>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<ins>C</ins>
       * <ins>A</del>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<del>C</del>
       */
      if (lastequality && ((pre_ins && pre_del && post_ins && post_del) ||
                           ((lastequality.length < this.Diff_EditCost / 2) &&
                            (pre_ins + pre_del + post_ins + post_del) == 3))) {
        // Duplicate record.
        diffs.splice(equalities[equalitiesLength - 1], 0,
                     [DIFF_DELETE, lastequality]);
        // Change second copy to insert.
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        equalitiesLength--;  // Throw away the equality we just deleted;
        lastequality = null;
        if (pre_ins && pre_del) {
          // No changes made which could affect previous entry, keep going.
          post_ins = post_del = true;
          equalitiesLength = 0;
        } else {
          equalitiesLength--;  // Throw away the previous equality.
          pointer = equalitiesLength > 0 ?
              equalities[equalitiesLength - 1] : -1;
          post_ins = post_del = false;
        }
        changes = true;
      }
    }
    pointer++;
  }

  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};


/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupMerge = function(diffs) {
  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  var commonlength;
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete + count_insert > 1) {
          if (count_delete !== 0 && count_insert !== 0) {
            // Factor out any common prefixies.
            commonlength = this.diff_commonPrefix(text_insert, text_delete);
            if (commonlength !== 0) {
              if ((pointer - count_delete - count_insert) > 0 &&
                  diffs[pointer - count_delete - count_insert - 1][0] ==
                  DIFF_EQUAL) {
                diffs[pointer - count_delete - count_insert - 1][1] +=
                    text_insert.substring(0, commonlength);
              } else {
                diffs.splice(0, 0, [DIFF_EQUAL,
                                    text_insert.substring(0, commonlength)]);
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }
            // Factor out any common suffixies.
            commonlength = this.diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] = text_insert.substring(text_insert.length -
                  commonlength) + diffs[pointer][1];
              text_insert = text_insert.substring(0, text_insert.length -
                  commonlength);
              text_delete = text_delete.substring(0, text_delete.length -
                  commonlength);
            }
          }
          // Delete the offending records and add the merged ones.
          if (count_delete === 0) {
            diffs.splice(pointer - count_insert,
                count_delete + count_insert, [DIFF_INSERT, text_insert]);
          } else if (count_insert === 0) {
            diffs.splice(pointer - count_delete,
                count_delete + count_insert, [DIFF_DELETE, text_delete]);
          } else {
            diffs.splice(pointer - count_delete - count_insert,
                count_delete + count_insert, [DIFF_DELETE, text_delete],
                [DIFF_INSERT, text_insert]);
          }
          pointer = pointer - count_delete - count_insert +
                    (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === '') {
    diffs.pop();  // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  var changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      if (diffs[pointer][1].substring(diffs[pointer][1].length -
          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] = diffs[pointer - 1][1] +
            diffs[pointer][1].substring(0, diffs[pointer][1].length -
                                        diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
          diffs[pointer + 1][1]) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] =
            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
            diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};


/**
 * loc is a location in text1, compute and return the equivalent location in
 * text2.
 * e.g. 'The cat' vs 'The big cat', 1->1, 5->8
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @param {number} loc Location within text1.
 * @return {number} Location within text2.
 */
diff_match_patch.prototype.diff_xIndex = function(diffs, loc) {
  var chars1 = 0;
  var chars2 = 0;
  var last_chars1 = 0;
  var last_chars2 = 0;
  var x;
  for (x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_INSERT) {  // Equality or deletion.
      chars1 += diffs[x][1].length;
    }
    if (diffs[x][0] !== DIFF_DELETE) {  // Equality or insertion.
      chars2 += diffs[x][1].length;
    }
    if (chars1 > loc) {  // Overshot the location.
      break;
    }
    last_chars1 = chars1;
    last_chars2 = chars2;
  }
  // Was the location was deleted?
  if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
    return last_chars2;
  }
  // Add the remaining character length.
  return last_chars2 + (loc - last_chars1);
};


/**
 * Convert a diff array into a pretty HTML report.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} HTML representation.
 */
diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
  var html = [];
  var pattern_amp = /&/g;
  var pattern_lt = /</g;
  var pattern_gt = />/g;
  var pattern_para = /\n/g;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];    // Operation (insert, delete, equal)
    var data = diffs[x][1];  // Text of change.
    var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
        .replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
    switch (op) {
      case DIFF_INSERT:
        html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
        break;
      case DIFF_DELETE:
        html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
        break;
      case DIFF_EQUAL:
        html[x] = '<span>' + text + '</span>';
        break;
    }
  }
  return html.join('');
};


/**
 * Compute and return the source text (all equalities and deletions).
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Source text.
 */
diff_match_patch.prototype.diff_text1 = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_INSERT) {
      text[x] = diffs[x][1];
    }
  }
  return text.join('');
};


/**
 * Compute and return the destination text (all equalities and insertions).
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Destination text.
 */
diff_match_patch.prototype.diff_text2 = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_DELETE) {
      text[x] = diffs[x][1];
    }
  }
  return text.join('');
};


/**
 * Compute the Levenshtein distance; the number of inserted, deleted or
 * substituted characters.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {number} Number of changes.
 */
diff_match_patch.prototype.diff_levenshtein = function(diffs) {
  var levenshtein = 0;
  var insertions = 0;
  var deletions = 0;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];
    var data = diffs[x][1];
    switch (op) {
      case DIFF_INSERT:
        insertions += data.length;
        break;
      case DIFF_DELETE:
        deletions += data.length;
        break;
      case DIFF_EQUAL:
        // A deletion and an insertion is one substitution.
        levenshtein += Math.max(insertions, deletions);
        insertions = 0;
        deletions = 0;
        break;
    }
  }
  levenshtein += Math.max(insertions, deletions);
  return levenshtein;
};


/**
 * Crush the diff into an encoded string which describes the operations
 * required to transform text1 into text2.
 * E.g. =3\t-2\t+ing  -> Keep 3 chars, delete 2 chars, insert 'ing'.
 * Operations are tab-separated.  Inserted text is escaped using %xx notation.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Delta text.
 */
diff_match_patch.prototype.diff_toDelta = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    switch (diffs[x][0]) {
      case DIFF_INSERT:
        text[x] = '+' + encodeURI(diffs[x][1]);
        break;
      case DIFF_DELETE:
        text[x] = '-' + diffs[x][1].length;
        break;
      case DIFF_EQUAL:
        text[x] = '=' + diffs[x][1].length;
        break;
    }
  }
  return text.join('\t').replace(/%20/g, ' ');
};


/**
 * Given the original text1, and an encoded string which describes the
 * operations required to transform text1 into text2, compute the full diff.
 * @param {string} text1 Source string for the diff.
 * @param {string} delta Delta text.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @throws {!Error} If invalid input.
 */
diff_match_patch.prototype.diff_fromDelta = function(text1, delta) {
  var diffs = [];
  var diffsLength = 0;  // Keeping our own length var is faster in JS.
  var pointer = 0;  // Cursor in text1
  var tokens = delta.split(/\t/g);
  for (var x = 0; x < tokens.length; x++) {
    // Each token begins with a one character parameter which specifies the
    // operation of this token (delete, insert, equality).
    var param = tokens[x].substring(1);
    switch (tokens[x].charAt(0)) {
      case '+':
        try {
          diffs[diffsLength++] = [DIFF_INSERT, decodeURI(param)];
        } catch (ex) {
          // Malformed URI sequence.
          throw new Error('Illegal escape in diff_fromDelta: ' + param);
        }
        break;
      case '-':
        // Fall through.
      case '=':
        var n = parseInt(param, 10);
        if (isNaN(n) || n < 0) {
          throw new Error('Invalid number in diff_fromDelta: ' + param);
        }
        var text = text1.substring(pointer, pointer += n);
        if (tokens[x].charAt(0) == '=') {
          diffs[diffsLength++] = [DIFF_EQUAL, text];
        } else {
          diffs[diffsLength++] = [DIFF_DELETE, text];
        }
        break;
      default:
        // Blank tokens are ok (from a trailing \t).
        // Anything else is an error.
        if (tokens[x]) {
          throw new Error('Invalid diff operation in diff_fromDelta: ' +
                          tokens[x]);
        }
    }
  }
  if (pointer != text1.length) {
    throw new Error('Delta length (' + pointer +
        ') does not equal source text length (' + text1.length + ').');
  }
  return diffs;
};


//  MATCH FUNCTIONS


/**
 * Locate the best instance of 'pattern' in 'text' near 'loc'.
 * @param {string} text The text to search.
 * @param {string} pattern The pattern to search for.
 * @param {number} loc The location to search around.
 * @return {number} Best match index or -1.
 */
diff_match_patch.prototype.match_main = function(text, pattern, loc) {
  // Check for null inputs.
  if (text == null || pattern == null || loc == null) {
    throw new Error('Null input. (match_main)');
  }

  loc = Math.max(0, Math.min(loc, text.length));
  if (text == pattern) {
    // Shortcut (potentially not guaranteed by the algorithm)
    return 0;
  } else if (!text.length) {
    // Nothing to match.
    return -1;
  } else if (text.substring(loc, loc + pattern.length) == pattern) {
    // Perfect match at the perfect spot!  (Includes case of null pattern)
    return loc;
  } else {
    // Do a fuzzy compare.
    return this.match_bitap_(text, pattern, loc);
  }
};


/**
 * Locate the best instance of 'pattern' in 'text' near 'loc' using the
 * Bitap algorithm.
 * @param {string} text The text to search.
 * @param {string} pattern The pattern to search for.
 * @param {number} loc The location to search around.
 * @return {number} Best match index or -1.
 * @private
 */
diff_match_patch.prototype.match_bitap_ = function(text, pattern, loc) {
  if (pattern.length > this.Match_MaxBits) {
    throw new Error('Pattern too long for this browser.');
  }

  // Initialise the alphabet.
  var s = this.match_alphabet_(pattern);

  var dmp = this;  // 'this' becomes 'window' in a closure.

  /**
   * Compute and return the score for a match with e errors and x location.
   * Accesses loc and pattern through being a closure.
   * @param {number} e Number of errors in match.
   * @param {number} x Location of match.
   * @return {number} Overall score for match (0.0 = good, 1.0 = bad).
   * @private
   */
  function match_bitapScore_(e, x) {
    var accuracy = e / pattern.length;
    var proximity = Math.abs(loc - x);
    if (!dmp.Match_Distance) {
      // Dodge divide by zero error.
      return proximity ? 1.0 : accuracy;
    }
    return accuracy + (proximity / dmp.Match_Distance);
  }

  // Highest score beyond which we give up.
  var score_threshold = this.Match_Threshold;
  // Is there a nearby exact match? (speedup)
  var best_loc = text.indexOf(pattern, loc);
  if (best_loc != -1) {
    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
    // What about in the other direction? (speedup)
    best_loc = text.lastIndexOf(pattern, loc + pattern.length);
    if (best_loc != -1) {
      score_threshold =
          Math.min(match_bitapScore_(0, best_loc), score_threshold);
    }
  }

  // Initialise the bit arrays.
  var matchmask = 1 << (pattern.length - 1);
  best_loc = -1;

  var bin_min, bin_mid;
  var bin_max = pattern.length + text.length;
  var last_rd;
  for (var d = 0; d < pattern.length; d++) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from 'loc' we can stray at this
    // error level.
    bin_min = 0;
    bin_mid = bin_max;
    while (bin_min < bin_mid) {
      if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
        bin_min = bin_mid;
      } else {
        bin_max = bin_mid;
      }
      bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
    }
    // Use the result from this iteration as the maximum for the next.
    bin_max = bin_mid;
    var start = Math.max(1, loc - bin_mid + 1);
    var finish = Math.min(loc + bin_mid, text.length) + pattern.length;

    var rd = Array(finish + 2);
    rd[finish + 1] = (1 << d) - 1;
    for (var j = finish; j >= start; j--) {
      // The alphabet (s) is a sparse hash, so the following line generates
      // warnings.
      var charMatch = s[text.charAt(j - 1)];
      if (d === 0) {  // First pass: exact match.
        rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;
      } else {  // Subsequent passes: fuzzy match.
        rd[j] = (((rd[j + 1] << 1) | 1) & charMatch) |
                (((last_rd[j + 1] | last_rd[j]) << 1) | 1) |
                last_rd[j + 1];
      }
      if (rd[j] & matchmask) {
        var score = match_bitapScore_(d, j - 1);
        // This match will almost certainly be better than any existing match.
        // But check anyway.
        if (score <= score_threshold) {
          // Told you so.
          score_threshold = score;
          best_loc = j - 1;
          if (best_loc > loc) {
            // When passing loc, don't exceed our current distance from loc.
            start = Math.max(1, 2 * loc - best_loc);
          } else {
            // Already passed loc, downhill from here on in.
            break;
          }
        }
      }
    }
    // No hope for a (better) match at greater error levels.
    if (match_bitapScore_(d + 1, loc) > score_threshold) {
      break;
    }
    last_rd = rd;
  }
  return best_loc;
};


/**
 * Initialise the alphabet for the Bitap algorithm.
 * @param {string} pattern The text to encode.
 * @return {!Object} Hash of character locations.
 * @private
 */
diff_match_patch.prototype.match_alphabet_ = function(pattern) {
  var s = {};
  for (var i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] = 0;
  }
  for (var i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] |= 1 << (pattern.length - i - 1);
  }
  return s;
};


//  PATCH FUNCTIONS


/**
 * Increase the context until it is unique,
 * but don't let the pattern expand beyond Match_MaxBits.
 * @param {!diff_match_patch.patch_obj} patch The patch to grow.
 * @param {string} text Source text.
 * @private
 */
diff_match_patch.prototype.patch_addContext_ = function(patch, text) {
  if (text.length == 0) {
    return;
  }
  var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
  var padding = 0;

  // Look for the first and last matches of pattern in text.  If two different
  // matches are found, increase the pattern length.
  while (text.indexOf(pattern) != text.lastIndexOf(pattern) &&
         pattern.length < this.Match_MaxBits - this.Patch_Margin -
         this.Patch_Margin) {
    padding += this.Patch_Margin;
    pattern = text.substring(patch.start2 - padding,
                             patch.start2 + patch.length1 + padding);
  }
  // Add one chunk for good luck.
  padding += this.Patch_Margin;

  // Add the prefix.
  var prefix = text.substring(patch.start2 - padding, patch.start2);
  if (prefix) {
    patch.diffs.unshift([DIFF_EQUAL, prefix]);
  }
  // Add the suffix.
  var suffix = text.substring(patch.start2 + patch.length1,
                              patch.start2 + patch.length1 + padding);
  if (suffix) {
    patch.diffs.push([DIFF_EQUAL, suffix]);
  }

  // Roll back the start points.
  patch.start1 -= prefix.length;
  patch.start2 -= prefix.length;
  // Extend the lengths.
  patch.length1 += prefix.length + suffix.length;
  patch.length2 += prefix.length + suffix.length;
};


/**
 * Compute a list of patches to turn text1 into text2.
 * Use diffs if provided, otherwise compute it ourselves.
 * There are four ways to call this function, depending on what data is
 * available to the caller:
 * Method 1:
 * a = text1, b = text2
 * Method 2:
 * a = diffs
 * Method 3 (optimal):
 * a = text1, b = diffs
 * Method 4 (deprecated, use method 3):
 * a = text1, b = text2, c = diffs
 *
 * @param {string|!Array.<!diff_match_patch.Diff>} a text1 (methods 1,3,4) or
 * Array of diff tuples for text1 to text2 (method 2).
 * @param {string|!Array.<!diff_match_patch.Diff>} opt_b text2 (methods 1,4) or
 * Array of diff tuples for text1 to text2 (method 3) or undefined (method 2).
 * @param {string|!Array.<!diff_match_patch.Diff>} opt_c Array of diff tuples
 * for text1 to text2 (method 4) or undefined (methods 1,2,3).
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
 */
diff_match_patch.prototype.patch_make = function(a, opt_b, opt_c) {
  var text1, diffs;
  if (typeof a == 'string' && typeof opt_b == 'string' &&
      typeof opt_c == 'undefined') {
    // Method 1: text1, text2
    // Compute diffs from text1 and text2.
    text1 = /** @type {string} */(a);
    diffs = this.diff_main(text1, /** @type {string} */(opt_b), true);
    if (diffs.length > 2) {
      this.diff_cleanupSemantic(diffs);
      this.diff_cleanupEfficiency(diffs);
    }
  } else if (a && typeof a == 'object' && typeof opt_b == 'undefined' &&
      typeof opt_c == 'undefined') {
    // Method 2: diffs
    // Compute text1 from diffs.
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(a);
    text1 = this.diff_text1(diffs);
  } else if (typeof a == 'string' && opt_b && typeof opt_b == 'object' &&
      typeof opt_c == 'undefined') {
    // Method 3: text1, diffs
    text1 = /** @type {string} */(a);
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_b);
  } else if (typeof a == 'string' && typeof opt_b == 'string' &&
      opt_c && typeof opt_c == 'object') {
    // Method 4: text1, text2, diffs
    // text2 is not used.
    text1 = /** @type {string} */(a);
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_c);
  } else {
    throw new Error('Unknown call format to patch_make.');
  }

  if (diffs.length === 0) {
    return [];  // Get rid of the null case.
  }
  var patches = [];
  var patch = new diff_match_patch.patch_obj();
  var patchDiffLength = 0;  // Keeping our own length var is faster in JS.
  var char_count1 = 0;  // Number of characters into the text1 string.
  var char_count2 = 0;  // Number of characters into the text2 string.
  // Start with text1 (prepatch_text) and apply the diffs until we arrive at
  // text2 (postpatch_text).  We recreate the patches one by one to determine
  // context info.
  var prepatch_text = text1;
  var postpatch_text = text1;
  for (var x = 0; x < diffs.length; x++) {
    var diff_type = diffs[x][0];
    var diff_text = diffs[x][1];

    if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
      // A new patch starts here.
      patch.start1 = char_count1;
      patch.start2 = char_count2;
    }

    switch (diff_type) {
      case DIFF_INSERT:
        patch.diffs[patchDiffLength++] = diffs[x];
        patch.length2 += diff_text.length;
        postpatch_text = postpatch_text.substring(0, char_count2) + diff_text +
                         postpatch_text.substring(char_count2);
        break;
      case DIFF_DELETE:
        patch.length1 += diff_text.length;
        patch.diffs[patchDiffLength++] = diffs[x];
        postpatch_text = postpatch_text.substring(0, char_count2) +
                         postpatch_text.substring(char_count2 +
                             diff_text.length);
        break;
      case DIFF_EQUAL:
        if (diff_text.length <= 2 * this.Patch_Margin &&
            patchDiffLength && diffs.length != x + 1) {
          // Small equality inside a patch.
          patch.diffs[patchDiffLength++] = diffs[x];
          patch.length1 += diff_text.length;
          patch.length2 += diff_text.length;
        } else if (diff_text.length >= 2 * this.Patch_Margin) {
          // Time for a new patch.
          if (patchDiffLength) {
            this.patch_addContext_(patch, prepatch_text);
            patches.push(patch);
            patch = new diff_match_patch.patch_obj();
            patchDiffLength = 0;
            // Unlike Unidiff, our patch lists have a rolling context.
            // http://code.google.com/p/google-diff-match-patch/wiki/Unidiff
            // Update prepatch text & pos to reflect the application of the
            // just completed patch.
            prepatch_text = postpatch_text;
            char_count1 = char_count2;
          }
        }
        break;
    }

    // Update the current character count.
    if (diff_type !== DIFF_INSERT) {
      char_count1 += diff_text.length;
    }
    if (diff_type !== DIFF_DELETE) {
      char_count2 += diff_text.length;
    }
  }
  // Pick up the leftover patch if not empty.
  if (patchDiffLength) {
    this.patch_addContext_(patch, prepatch_text);
    patches.push(patch);
  }

  return patches;
};


/**
 * Given an array of patches, return another array that is identical.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
 */
diff_match_patch.prototype.patch_deepCopy = function(patches) {
  // Making deep copies is hard in JavaScript.
  var patchesCopy = [];
  for (var x = 0; x < patches.length; x++) {
    var patch = patches[x];
    var patchCopy = new diff_match_patch.patch_obj();
    patchCopy.diffs = [];
    for (var y = 0; y < patch.diffs.length; y++) {
      patchCopy.diffs[y] = patch.diffs[y].slice();
    }
    patchCopy.start1 = patch.start1;
    patchCopy.start2 = patch.start2;
    patchCopy.length1 = patch.length1;
    patchCopy.length2 = patch.length2;
    patchesCopy[x] = patchCopy;
  }
  return patchesCopy;
};


/**
 * Merge a set of patches onto the text.  Return a patched text, as well
 * as a list of true/false values indicating which patches were applied.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @param {string} text Old text.
 * @return {!Array.<string|!Array.<boolean>>} Two element Array, containing the
 *      new text and an array of boolean values.
 */
diff_match_patch.prototype.patch_apply = function(patches, text) {
  if (patches.length == 0) {
    return [text, []];
  }

  // Deep copy the patches so that no changes are made to originals.
  patches = this.patch_deepCopy(patches);

  var nullPadding = this.patch_addPadding(patches);
  text = nullPadding + text + nullPadding;

  this.patch_splitMax(patches);
  // delta keeps track of the offset between the expected and actual location
  // of the previous patch.  If there are patches expected at positions 10 and
  // 20, but the first patch was found at 12, delta is 2 and the second patch
  // has an effective expected position of 22.
  var delta = 0;
  var results = [];
  for (var x = 0; x < patches.length; x++) {
    var expected_loc = patches[x].start2 + delta;
    var text1 = this.diff_text1(patches[x].diffs);
    var start_loc;
    var end_loc = -1;
    if (text1.length > this.Match_MaxBits) {
      // patch_splitMax will only provide an oversized pattern in the case of
      // a monster delete.
      start_loc = this.match_main(text, text1.substring(0, this.Match_MaxBits),
                                  expected_loc);
      if (start_loc != -1) {
        end_loc = this.match_main(text,
            text1.substring(text1.length - this.Match_MaxBits),
            expected_loc + text1.length - this.Match_MaxBits);
        if (end_loc == -1 || start_loc >= end_loc) {
          // Can't find valid trailing context.  Drop this patch.
          start_loc = -1;
        }
      }
    } else {
      start_loc = this.match_main(text, text1, expected_loc);
    }
    if (start_loc == -1) {
      // No match found.  :(
      results[x] = false;
      // Subtract the delta for this failed patch from subsequent patches.
      delta -= patches[x].length2 - patches[x].length1;
    } else {
      // Found a match.  :)
      results[x] = true;
      delta = start_loc - expected_loc;
      var text2;
      if (end_loc == -1) {
        text2 = text.substring(start_loc, start_loc + text1.length);
      } else {
        text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
      }
      if (text1 == text2) {
        // Perfect match, just shove the replacement text in.
        text = text.substring(0, start_loc) +
               this.diff_text2(patches[x].diffs) +
               text.substring(start_loc + text1.length);
      } else {
        // Imperfect match.  Run a diff to get a framework of equivalent
        // indices.
        var diffs = this.diff_main(text1, text2, false);
        if (text1.length > this.Match_MaxBits &&
            this.diff_levenshtein(diffs) / text1.length >
            this.Patch_DeleteThreshold) {
          // The end points match, but the content is unacceptably bad.
          results[x] = false;
        } else {
          this.diff_cleanupSemanticLossless(diffs);
          var index1 = 0;
          var index2;
          for (var y = 0; y < patches[x].diffs.length; y++) {
            var mod = patches[x].diffs[y];
            if (mod[0] !== DIFF_EQUAL) {
              index2 = this.diff_xIndex(diffs, index1);
            }
            if (mod[0] === DIFF_INSERT) {  // Insertion
              text = text.substring(0, start_loc + index2) + mod[1] +
                     text.substring(start_loc + index2);
            } else if (mod[0] === DIFF_DELETE) {  // Deletion
              text = text.substring(0, start_loc + index2) +
                     text.substring(start_loc + this.diff_xIndex(diffs,
                         index1 + mod[1].length));
            }
            if (mod[0] !== DIFF_DELETE) {
              index1 += mod[1].length;
            }
          }
        }
      }
    }
  }
  // Strip the padding off.
  text = text.substring(nullPadding.length, text.length - nullPadding.length);
  return [text, results];
};


/**
 * Add some padding on text start and end so that edges can match something.
 * Intended to be called only from within patch_apply.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @return {string} The padding string added to each side.
 */
diff_match_patch.prototype.patch_addPadding = function(patches) {
  var paddingLength = this.Patch_Margin;
  var nullPadding = '';
  for (var x = 1; x <= paddingLength; x++) {
    nullPadding += String.fromCharCode(x);
  }

  // Bump all the patches forward.
  for (var x = 0; x < patches.length; x++) {
    patches[x].start1 += paddingLength;
    patches[x].start2 += paddingLength;
  }

  // Add some padding on start of first diff.
  var patch = patches[0];
  var diffs = patch.diffs;
  if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
    // Add nullPadding equality.
    diffs.unshift([DIFF_EQUAL, nullPadding]);
    patch.start1 -= paddingLength;  // Should be 0.
    patch.start2 -= paddingLength;  // Should be 0.
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[0][1].length) {
    // Grow first equality.
    var extraLength = paddingLength - diffs[0][1].length;
    diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
    patch.start1 -= extraLength;
    patch.start2 -= extraLength;
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }

  // Add some padding on end of last diff.
  patch = patches[patches.length - 1];
  diffs = patch.diffs;
  if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
    // Add nullPadding equality.
    diffs.push([DIFF_EQUAL, nullPadding]);
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[diffs.length - 1][1].length) {
    // Grow last equality.
    var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
    diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }

  return nullPadding;
};


/**
 * Look through the patches and break up any which are longer than the maximum
 * limit of the match algorithm.
 * Intended to be called only from within patch_apply.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 */
diff_match_patch.prototype.patch_splitMax = function(patches) {
  var patch_size = this.Match_MaxBits;
  for (var x = 0; x < patches.length; x++) {
    if (patches[x].length1 <= patch_size) {
      continue;
    }
    var bigpatch = patches[x];
    // Remove the big old patch.
    patches.splice(x--, 1);
    var start1 = bigpatch.start1;
    var start2 = bigpatch.start2;
    var precontext = '';
    while (bigpatch.diffs.length !== 0) {
      // Create one of several smaller patches.
      var patch = new diff_match_patch.patch_obj();
      var empty = true;
      patch.start1 = start1 - precontext.length;
      patch.start2 = start2 - precontext.length;
      if (precontext !== '') {
        patch.length1 = patch.length2 = precontext.length;
        patch.diffs.push([DIFF_EQUAL, precontext]);
      }
      while (bigpatch.diffs.length !== 0 &&
             patch.length1 < patch_size - this.Patch_Margin) {
        var diff_type = bigpatch.diffs[0][0];
        var diff_text = bigpatch.diffs[0][1];
        if (diff_type === DIFF_INSERT) {
          // Insertions are harmless.
          patch.length2 += diff_text.length;
          start2 += diff_text.length;
          patch.diffs.push(bigpatch.diffs.shift());
          empty = false;
        } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 &&
                   patch.diffs[0][0] == DIFF_EQUAL &&
                   diff_text.length > 2 * patch_size) {
          // This is a large deletion.  Let it pass in one chunk.
          patch.length1 += diff_text.length;
          start1 += diff_text.length;
          empty = false;
          patch.diffs.push([diff_type, diff_text]);
          bigpatch.diffs.shift();
        } else {
          // Deletion or equality.  Only take as much as we can stomach.
          diff_text = diff_text.substring(0,
              patch_size - patch.length1 - this.Patch_Margin);
          patch.length1 += diff_text.length;
          start1 += diff_text.length;
          if (diff_type === DIFF_EQUAL) {
            patch.length2 += diff_text.length;
            start2 += diff_text.length;
          } else {
            empty = false;
          }
          patch.diffs.push([diff_type, diff_text]);
          if (diff_text == bigpatch.diffs[0][1]) {
            bigpatch.diffs.shift();
          } else {
            bigpatch.diffs[0][1] =
                bigpatch.diffs[0][1].substring(diff_text.length);
          }
        }
      }
      // Compute the head context for the next patch.
      precontext = this.diff_text2(patch.diffs);
      precontext =
          precontext.substring(precontext.length - this.Patch_Margin);
      // Append the end context for this patch.
      var postcontext = this.diff_text1(bigpatch.diffs)
                            .substring(0, this.Patch_Margin);
      if (postcontext !== '') {
        patch.length1 += postcontext.length;
        patch.length2 += postcontext.length;
        if (patch.diffs.length !== 0 &&
            patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
          patch.diffs[patch.diffs.length - 1][1] += postcontext;
        } else {
          patch.diffs.push([DIFF_EQUAL, postcontext]);
        }
      }
      if (!empty) {
        patches.splice(++x, 0, patch);
      }
    }
  }
};


/**
 * Take a list of patches and return a textual representation.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @return {string} Text representation of patches.
 */
diff_match_patch.prototype.patch_toText = function(patches) {
  var text = [];
  for (var x = 0; x < patches.length; x++) {
    text[x] = patches[x];
  }
  return text.join('');
};


/**
 * Parse a textual representation of patches and return a list of Patch objects.
 * @param {string} textline Text representation of patches.
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
 * @throws {!Error} If invalid input.
 */
diff_match_patch.prototype.patch_fromText = function(textline) {
  var patches = [];
  if (!textline) {
    return patches;
  }
  var text = textline.split('\n');
  var textPointer = 0;
  var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
  while (textPointer < text.length) {
    var m = text[textPointer].match(patchHeader);
    if (!m) {
      throw new Error('Invalid patch string: ' + text[textPointer]);
    }
    var patch = new diff_match_patch.patch_obj();
    patches.push(patch);
    patch.start1 = parseInt(m[1], 10);
    if (m[2] === '') {
      patch.start1--;
      patch.length1 = 1;
    } else if (m[2] == '0') {
      patch.length1 = 0;
    } else {
      patch.start1--;
      patch.length1 = parseInt(m[2], 10);
    }

    patch.start2 = parseInt(m[3], 10);
    if (m[4] === '') {
      patch.start2--;
      patch.length2 = 1;
    } else if (m[4] == '0') {
      patch.length2 = 0;
    } else {
      patch.start2--;
      patch.length2 = parseInt(m[4], 10);
    }
    textPointer++;

    while (textPointer < text.length) {
      var sign = text[textPointer].charAt(0);
      try {
        var line = decodeURI(text[textPointer].substring(1));
      } catch (ex) {
        // Malformed URI sequence.
        throw new Error('Illegal escape in patch_fromText: ' + line);
      }
      if (sign == '-') {
        // Deletion.
        patch.diffs.push([DIFF_DELETE, line]);
      } else if (sign == '+') {
        // Insertion.
        patch.diffs.push([DIFF_INSERT, line]);
      } else if (sign == ' ') {
        // Minor equality.
        patch.diffs.push([DIFF_EQUAL, line]);
      } else if (sign == '@') {
        // Start of next patch.
        break;
      } else if (sign === '') {
        // Blank line?  Whatever.
      } else {
        // WTF?
        throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
      }
      textPointer++;
    }
  }
  return patches;
};


/**
 * Class representing one patch operation.
 * @constructor
 */
diff_match_patch.patch_obj = function() {
  /** @type {!Array.<!diff_match_patch.Diff>} */
  this.diffs = [];
  /** @type {?number} */
  this.start1 = null;
  /** @type {?number} */
  this.start2 = null;
  /** @type {number} */
  this.length1 = 0;
  /** @type {number} */
  this.length2 = 0;
};


/**
 * Emmulate GNU diff's format.
 * Header: @@ -382,8 +481,9 @@
 * Indicies are printed as 1-based, not 0-based.
 * @return {string} The GNU diff string.
 */
diff_match_patch.patch_obj.prototype.toString = function() {
  var coords1, coords2;
  if (this.length1 === 0) {
    coords1 = this.start1 + ',0';
  } else if (this.length1 == 1) {
    coords1 = this.start1 + 1;
  } else {
    coords1 = (this.start1 + 1) + ',' + this.length1;
  }
  if (this.length2 === 0) {
    coords2 = this.start2 + ',0';
  } else if (this.length2 == 1) {
    coords2 = this.start2 + 1;
  } else {
    coords2 = (this.start2 + 1) + ',' + this.length2;
  }
  var text = ['@@ -' + coords1 + ' +' + coords2 + ' @@\n'];
  var op;
  // Escape the body of the patch with %xx notation.
  for (var x = 0; x < this.diffs.length; x++) {
    switch (this.diffs[x][0]) {
      case DIFF_INSERT:
        op = '+';
        break;
      case DIFF_DELETE:
        op = '-';
        break;
      case DIFF_EQUAL:
        op = ' ';
        break;
    }
    text[x + 1] = op + encodeURI(this.diffs[x][1]) + '\n';
  }
  return text.join('').replace(/%20/g, ' ');
};


// Export these global variables so that they survive Google's JS compiler.
// In a browser, 'this' will be 'window'.
// Users of node.js should 'require' the uncompressed version since Google's
// JS compiler may break the following exports for non-browser environments.
this['diff_match_patch'] = diff_match_patch;
this['DIFF_DELETE'] = DIFF_DELETE;
this['DIFF_INSERT'] = DIFF_INSERT;
this['DIFF_EQUAL'] = DIFF_EQUAL;


/***/ }),

/***/ 357:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promise = __webpack_require__(29);

var _promise2 = _interopRequireDefault(_promise);

var _vue = __webpack_require__(45);

var _vue2 = _interopRequireDefault(_vue);

var _App = __webpack_require__(69);

var _App2 = _interopRequireDefault(_App);

var _router = __webpack_require__(67);

var _router2 = _interopRequireDefault(_router);

var _vuex = __webpack_require__(6);

var _vuex2 = _interopRequireDefault(_vuex);

__webpack_require__(68);

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
window.$vmm = new _vue2.default({
  el: '#app',
  store: store,
  router: _router2.default,
  template: '<App/>',
  components: { App: _App2.default }
});

/***/ }),

/***/ 39:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var Delay = function(millisecond,func){
    this.index = ""
    this.millisecond = millisecond || 2000
    this.func = func
}
Delay.prototype.push = function(){
    clearTimeout(this.index)
    this.index = setTimeout(this.func, this.millisecond);
}
Delay.prototype.execute = function(){
    clearTimeout(this.index)
    this.func()
    // this.index = setTimeout(this.func, this.millisecond);
}
/* harmony default export */ __webpack_exports__["default"] = Delay;

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var GDMP = __webpack_require__(356)


// 编辑器增量更新
// 使用方式
/*
import EVA from '../../serve/fontend/Obj/EditorValueAdvance.js'
this.EVA = new EVA()
self.EVA.reset() // 重置对比值

self.EVA.value = 11 //设置值
self.EVA.value = 22 //再次设置值，这时与之前的值开始进行比较

var cc = self.EVA.value //获取值

self.EVA.patch_list //获取差异值
*/
function EditorValueAdvance(){
	let old_value = ""
	let value = ""
	let patch_list = undefined

	let dmp = new GDMP.diff_match_patch()
	// this.onSet = onSet
	Object.defineProperty(this, 'value', {
		get:function(){
			return value
		},
	    set: function(text) {
			old_value = value
			value = text
			// diff_result = dmp.diff_main(old_value, value, true)
			// console.log(diff_result)
	    }
	})
	Object.defineProperty(this, 'reset', {
		value:function(){
			old_value = ""
			value = ""
			patch_list = undefined
		}
	})
	Object.defineProperty(this, 'patch_list', {
		get: function(){
			let diffs = dmp.diff_main(old_value, value, true)
			let result = dmp.patch_make(old_value, value, diffs)
			return result
		}
	})
}
/* harmony default export */ __webpack_exports__["default"] = EditorValueAdvance;

// var eva = new EditorValueAdvance()
// eva.value = 1
// eva.value = 2
// eva.value = 3
// let obj = {}
// Object.defineProperty(obj,'value',{
// 	get:function(){

// 	},
// 	set:function(text){
// 		if(obj.old_value === undefined){
// 			obj.old_value = text
// 		}
// 		console.log('old_value is ',obj.old_value)
// 		obj.old_value = text
// 		console.log('current_value is',obj.current_value)
// 	}
// })
// Object.defineProperty(obj,'old_value',{
// 	value:undefined
// })
// Object.defineProperty(obj,'clearValue',{
// 	value:function(){
// 		obj.old_value = ""
// 		obj.value = ""
// 	}
// })

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__upload_Upload_js__ = __webpack_require__(351);
/*
封装的目的是什么？

1. 提取重复的代码。
2. 保持代码整洁。

拖动事件有哪些重复代码？

1. 拖动处理：hover （参数传入回调方法）
2. 拖动处理：结束 （参数传入回调方法）
3. 拖动处理：onDrop 响应 （参数传入回调方法）

因为拖动处理是 DOM 事件，需要绑定元素，所以要传入元素 Id。

*/


function blobToFile(theBlob, fileName){
	//A Blob() is almost a File() - it's just missing the two properties below which we will add
	theBlob.lastModifiedDate = new Date();
	theBlob.name = fileName;
	return theBlob;
}
var dndUpload = function (element, options) {

	var options = Object.assign({
		onSuccess: undefined,
		onError: undefined,
		onComplete: undefined,
		onProcess: undefined,
		serve_url: undefined
	}, options)
	// options.serve_url = 'http://localhost:3000/upload' || 
	var upload = new __WEBPACK_IMPORTED_MODULE_0__upload_Upload_js__["a" /* default */]({
		serve_url: options.serve_url, onSuccess: function (res) {
			// console.log(res)
			options.onSuccess(JSON.parse(res.target.responseText))
			// var obj = JSON.parse(res.target.responseText)
			// console.log(obj)
		}
	})

	/* events fired on the draggable target */
	element.addEventListener("drag", function (event) {
		// console.log(event.DataTransfer.files)
		// console.log(123)
		// upload.start(event.DataTransfer.files[0])
	}, false);





	element.addEventListener("dragstart", function (event) {
		// store a ref. on the dragged elem
		// dragged = event.target;
		// make it half transparent
		// event.target.style.opacity = .5;
		console.log(1233)
	}, false);

	element.addEventListener("dragend", function (event) {
		// reset the transparency
		// event.target.style.opacity = "";
	}, false);

	/* events fired on the drop targets */
	element.addEventListener("dragover", function (event) {
		// prevent default to allow drop
		event.preventDefault();
		console.log(333)
	}, false);

	element.addEventListener("dragenter", function (event) {
		// highlight potential drop target when the draggable element enters it
		// if ( event.target.className == "dropzone" ) {
		//     event.target.style.background = "purple";
		// }

	}, false);

	element.addEventListener("dragleave", function (event) {
		// reset background of potential drop target when the draggable element leaves it
		// if ( event.target.className == "dropzone" ) {
		//     event.target.style.background = "";
		// }

	}, false);

	element.addEventListener("drop", function (event) {

		upload.start(event.dataTransfer.files[0])

		// prevent default action (open as link for some elements)
		event.preventDefault();
		// move dragged elem to the selected drop target
		// if ( event.target.className == "dropzone" ) {
		//     event.target.style.background = "";
		//     dragged.parentNode.removeChild( dragged );
		//     event.target.appendChild( dragged );
		// }

	}, false);

	element.addEventListener('paste', function (event) {
		console.log('paste')
		var isChrome = false;
		if (event.clipboardData || event.originalEvent) {
			var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
			console.log('clipboardData', clipboardData)
			if (clipboardData.items) {
				// for chrome
				var items = clipboardData.items,
					len = items.length,
					blob = null;
				isChrome = true;

				

				//在items里找粘贴的image,据上面分析,需要循环  
				for (var i = 0; i < len; i++) {
					if (items[i].type.indexOf("image") !== -1) {
						// console.log(items[i]);
						// console.log( typeof (items[i]));

						//getAsFile() 此方法只是living standard firefox ie11 并不支持        
						blob = items[i].getAsFile();
					}
				}
				if (blob !== null) {
					//阻止默认行为即不让剪贴板内容在div中显示出来
					event.preventDefault();
					
					// var file=blobToFile(blob,'111.jpg')
					console.log('file',blob)

					upload.start(blob)
					
					// var reader = new FileReader();
					// reader.onload = function (event) {
					// 	// event.target.result 即为图片的Base64编码字符串
					// 	var base64_str = event.target.result
					// 	//可以在这里写上传逻辑 直接将base64编码的字符串上传（可以尝试传入blob对象，看看后台程序能否解析）
					// 	console.log('img base64',base64_str)
					// 	// uploadImgFromPaste(base64_str, 'paste', isChrome);
					// }
					// reader.readAsDataURL(blob);
				}
			}

		}
	})


	// 添加黏贴上传功能
}

/* harmony default export */ __webpack_exports__["default"] = dndUpload;
// dndUpload.prototype.onDrop = function(){

// }
// dndUpload.prototype.onDragOver = function(){

// }
// dndUpload.prototype.startUpload = function(){

// }
// dndUpload.prototype.uploadSuccess = function(){

// }
// dndUpload.prototype.uploadEnd = function(){

// }


/***/ }),

/***/ 62:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 63:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 64:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(45);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(346);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Hello = __webpack_require__(333);

var _Hello2 = _interopRequireDefault(_Hello);

var _WriteArticle = __webpack_require__(335);

var _WriteArticle2 = _interopRequireDefault(_WriteArticle);

var _Login = __webpack_require__(334);

var _Login2 = _interopRequireDefault(_Login);

var _deploy = __webpack_require__(336);

var _deploy2 = _interopRequireDefault(_deploy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
exports.default = new _vueRouter2.default({
  mode: "history",
  routes: [{
    path: '/papers',
    name: 'WriteArticle',
    component: _WriteArticle2.default
  }, {
    path: '/papers',
    name: 'WriteArticle',
    component: _WriteArticle2.default
  }, {
    path: '/papers/:floderid',
    name: 'WriteArticle',
    component: _WriteArticle2.default
  }, {
    path: '/papers/:floderid/article/:articleid',
    name: 'WriteArticle2',
    component: _WriteArticle2.default
  }, {
    path: '/Login',
    name: 'Login',
    component: _Login2.default
  }]
});

/***/ }),

/***/ 68:
/***/ (function(module, exports) {

module.exports = "data:image/x-icon;base64,bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArICJmYXZpY29uLmljbyI7"

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(140)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(85),
  /* template */
  __webpack_require__(342),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(138);

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

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = __webpack_require__(46);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _regenerator = __webpack_require__(13);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _vuex = __webpack_require__(6);

__webpack_require__(23);

__webpack_require__(20);

__webpack_require__(24);

__webpack_require__(22);

__webpack_require__(62);

__webpack_require__(63);

__webpack_require__(64);

__webpack_require__(21);

__webpack_require__(39);

var _CONSTANT = __webpack_require__(2);

var _index = __webpack_require__(27);

var API = _interopRequireWildcard(_index);

var _co = __webpack_require__(14);

var _co2 = _interopRequireDefault(_co);

var _codemirror = __webpack_require__(4);

var _codemirror2 = _interopRequireDefault(_codemirror);

__webpack_require__(48);

var _Delay = __webpack_require__(42);

var _Delay2 = _interopRequireDefault(_Delay);

var _dndUpload = __webpack_require__(44);

var _dndUpload2 = _interopRequireDefault(_dndUpload);

var _EditorValueAdvance = __webpack_require__(43);

var _EditorValueAdvance2 = _interopRequireDefault(_EditorValueAdvance);

var _ytoolSwitch = __webpack_require__(28);

var _ytoolSwitch2 = _interopRequireDefault(_ytoolSwitch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var marked = __webpack_require__(41);
var renderer = new marked.Renderer();
var radCode = renderer.code;
renderer.code = function (code, lang, escaped) {
  if (lang === "raw") {
    return '<p class="lang-raw">' + code + "</p>";
  }
  var self = this;
  return radCode.call(self, code, lang, escaped);
};
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true,
  highlight: function highlight(code, type, sss) {
    return __webpack_require__(40).highlightAuto(code).value;
  },
  renderer: renderer
});

var LOGIN_CODE = __webpack_require__(25).CODE;

exports.default = {
  props: ["data"],
  data: function data() {
    return {
      floder_list: [],
      visible: {
        page_mode: 0,
        treeview: 1,
        editor: 1,
        markdown: 0
      },
      search_mode_show_flag: false,
      search_mode_content: "",
      floder_mode_show_type: "1",
      floder_add_show_flag: false,
      floder_active: "",
      floder_active_index: 0,
      floder_edit_index: -1,
      floder_add_visible: false,
      floder_add_input: "",
      floder_item_more_crud_element_visible: false,
      article_item_more_crud_element_visible: false,
      article_list: [],
      article_active: "",
      article_edit_index: -1,
      article_add_visible: false,
      article_add_input: "",
      article_title: "",
      article_content: "",
      article_content_style: {
        changed: false,
        saving: false,
        error: false
      },
      editor: "",
      Delay: "",
      onEditorChange: "",
      EVA: "",
      article_markdown_preview_text: ""
    };
  },

  methods: {

    article_content_save: function article_content_save(value, title, article_active, floder_uid) {
      var self = this;

      (0, _co2.default)(_regenerator2.default.mark(function _callee() {
        var update;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                self.article_content_style.saving = true;

                _context.next = 3;
                return API.ARTICLE.update(value, title, article_active, floder_uid);

              case 3:
                update = _context.sent;


                self.article_content_style.saving = false;
                self.article_content_style.changed = false;

                self.floder_sort_refresh();

                self.article_list_refresh();

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      })).catch(function (err) {
        alert(err.MSG);
      });
    },

    floder_sort_refresh: function floder_sort_refresh() {
      this.floder_list[this.floder_active_index].timemap = new Date().getTime();
      this.floder_active_index = 0;
    }
  },
  computed: {},
  watch: {
    data: {
      handler: function handler() {
        var self = this;
        console.log("watch");
        if (self.editor) {
          self.editor.off("change", this.onEditorChange);
        }
        self.EVA.reset();
        self.EVA.value = self.data || "";

        if (self.editor) {
          console.log("self.editor", self.editor);

          self.editor.setValue(self.EVA.value);
          self.editor.on("change", self.onEditorChange);
        }
      }
    }
  },
  mounted: function mounted() {
    var self = this;
    var e = this.$refs.ta1;

    this.editor = _codemirror2.default.fromTextArea(e, {
      mode: "gfm",
      theme: "zenburn",
      lineWrapping: true,
      extraKeys: {
        Enter: "newlineAndIndentContinueMarkdownList",
        "Ctrl-S": function CtrlS(cm) {
          self.Delay.execute();
        },
        "Alt-H": function AltH(cm) {
          var spaces = cm.getSelection();
          cm.replaceSelection("```html\r\n" + spaces + "\r\n```");
        },
        "Alt-J": function AltJ(cm) {
          var spaces = cm.getSelection();
          cm.replaceSelection("```js\r\n" + spaces + "\r\n```");
        },
        "Alt-K": function AltK(cm) {
          var spaces = cm.getSelection();
          cm.replaceSelection("```raw\r\n" + spaces + "\r\n```");
        },
        "Alt-L": function AltL(cm) {
          var spaces = cm.getSelection();
          cm.replaceSelection("[" + spaces + "]()");
        },
        "Alt-`": function Alt(cm) {
          var spaces = cm.getSelection();
          cm.replaceSelection("`" + spaces + "`");
        },
        "Alt-1": function Alt1(cm) {
          var curosr = cm.getCursor();
          cm.setCursor(curosr.line, 0);
          var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection("#" + spaces);
        },
        "Alt-2": function Alt2(cm) {
          var curosr = cm.getCursor();
          cm.setCursor(curosr.line, 0);
          var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection("##" + spaces);
        },
        "Alt-3": function Alt3(cm) {
          var curosr = cm.getCursor();
          cm.setCursor(curosr.line, 0);
          var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection("###" + spaces);
        },
        "Alt-I": function AltI(cm) {
          var curosr = cm.getCursor();
          cm.setCursor(curosr.line, 0);
          var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection("* " + spaces);
        }
      }
    });


    this.Delay = new _Delay2.default(5000, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              self.EVA.value = self.editor.getValue();

              self.$emit("save", { content: self.EVA.patch_list, editor: "codemirror" });

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));

    this.onEditorChange = function () {
      self.$emit('changed');

      self.Delay.push();
    };

    this.EVA = new _EditorValueAdvance2.default();

    var code_mirror = document.getElementsByClassName("CodeMirror")[0];
    code_mirror.style.height = window.innerHeight - 106 + "px";
    window.onresize = function () {
      code_mirror.style.height = window.innerHeight - 106 + "px";
    };
    var dnd_upload = new _dndUpload2.default(document.getElementsByClassName("article")[0], {
      onSuccess: function onSuccess(res) {
        var current_line = self.editor.getCursor().line;
        var img = "![](" + res.img_url.replace("IPADDRESS", _CONSTANT.IP) + ")";
        self.editor.replaceRange("\r\n\r\n" + img + "\r\n\r\n", {
          line: current_line,
          ch: 0
        });
      }
    });
  }
};

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(95);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(6);

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

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Count = __webpack_require__(332);

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

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _url = __webpack_require__(329);

var _url2 = _interopRequireDefault(_url);

var _CONSTANT = __webpack_require__(2);

var _base = __webpack_require__(12);

var BASE = _interopRequireWildcard(_base);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mounted: function mounted() {
    var uUrl = _url2.default.parse(location.href, true);
    console.log(123);
    if (uUrl.query.t) {
      BASE.saveToken(uUrl.query.t);
      location.href = "/papers";
      self.$root.username = BASE.getUsername();
      self.$router.push('WriteArticle');
    } else {
      location.href = "http://oauth.dve2.com/oauth_login?r=" + _CONSTANT.Host + "/login";
    }
  }
};

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(13);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _vuex = __webpack_require__(6);

__webpack_require__(23);

__webpack_require__(20);

__webpack_require__(24);

__webpack_require__(22);

__webpack_require__(21);

__webpack_require__(39);

var _CONSTANT = __webpack_require__(2);

var _index = __webpack_require__(27);

var API = _interopRequireWildcard(_index);

var _co = __webpack_require__(14);

var _co2 = _interopRequireDefault(_co);

var _ytoolSwitch = __webpack_require__(28);

var _ytoolSwitch2 = _interopRequireDefault(_ytoolSwitch);

var _editor = __webpack_require__(337);

var _editor2 = _interopRequireDefault(_editor);

var _CodeMirror = __webpack_require__(331);

var _CodeMirror2 = _interopRequireDefault(_CodeMirror);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGIN_CODE = __webpack_require__(25).CODE;


var marked = __webpack_require__(41);
var renderer = new marked.Renderer();
var radCode = renderer.code;
renderer.code = function (code, lang, escaped) {
  if (lang === 'raw') {
    return '<p class="lang-raw">' + code + '</p>';
  }
  var self = this;
  return radCode.call(self, code, lang, escaped);
};
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true,
  highlight: function highlight(code, type, sss) {
    return __webpack_require__(40).highlightAuto(code).value;
  }, renderer: renderer
});

exports.default = {
  components: {
    editor: _editor2.default,
    editorCodemirror: _CodeMirror2.default
  },
  data: function data() {
    return {
      editorQuery: "codemirror",
      is_listen_change: false,
      floder_list: [],
      visible: {
        page_mode: 0,
        treeview: 1,
        editor: 1,
        markdown: 0
      },
      search_mode_show_flag: false,
      search_mode_content: "",
      floder_mode_show_type: "1",
      floder_add_show_flag: false,
      floder_active: "",
      floder_active_index: 0,
      floder_edit_index: -1,
      floder_add_visible: false,
      floder_add_input: "",
      floder_item_more_crud_element_visible: false,
      article_item_more_crud_element_visible: false,
      article_list: [],
      article_active: "",
      article_edit_index: -1,
      article_add_visible: false,
      article_add_input: "",
      article_title: "",
      article_content: "",
      article_content_style: {
        changed: false,
        saving: false,
        error: false
      },
      editor: "sb",
      Delay: "",
      onEditorChange: "",

      article_markdown_preview_text: ""
    };
  },

  methods: {
    change_edtior: function change_edtior() {
      var currentEditor = this.$route.query.editor;
      if (currentEditor == "editor") {
        this.$router.push({ query: { editor: "codemirror" } });
        this.editorQuery = "codemirror";
        return;
      } else {
        this.$router.push({ query: { editor: "editor" } });
        this.editorQuery = "editor";
        return;
      }
    },
    article_content_save: function article_content_save(obj) {
      var self = this;
      console.log("article_content_save", obj);
      (0, _co2.default)(_regenerator2.default.mark(function _callee() {
        var update;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                self.article_content_style.saving = true;
                _context.next = 3;
                return API.ARTICLE.update(obj.content, self.article_title, self.article_active, self.floder_active, self.editorQuery);

              case 3:
                update = _context.sent;

                if (self.editorQuery == "codemirror") {
                  self.article_markdown_preview_text = marked(self.$refs.codemirror.EVA.value);
                }

                self.article_content_style.saving = false;
                self.article_content_style.changed = false;

                self.floder_sort_refresh();

                self.article_list_refresh();

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      })).catch(function (err) {
        console.log(err);
        alert(err.MSG);
      });
    },
    article_deploy: function article_deploy() {
      API.ARTICLE.deploy(this.article_active);
    },


    visible_only_editor: function visible_only_editor() {
      if (this.visible.page_mode != 2) {
        this.visible = {
          page_mode: 2,
          treeview: 0,
          editor: 1,
          markdown: 0
        };
      } else {
        this.visible = {
          page_mode: 0,
          treeview: 1,
          editor: 1,
          markdown: 0
        };
      }
    },
    visible_editor_markdown: function visible_editor_markdown() {
      if (this.visible.page_mode != 1) {
        this.visible = {
          page_mode: 1,
          treeview: 0,
          editor: 1,
          markdown: 1
        };
      } else {
        this.visible = {
          page_mode: 0,
          treeview: 1,
          editor: 1,
          markdown: 0
        };
      }
    },
    article_markdown_preview: function article_markdown_preview() {
      if (this.page_mode === 1) {
        this.page_mode = 0;
        return;
      }
      this.page_mode = 1;
    },
    search_mode_show: function search_mode_show() {
      this.search_mode_show_flag = !this.search_mode_show_flag;
    },
    search_mode_ok: function search_mode_ok() {
      var self = this;
      API.ARTICLE.search(this.search_mode_content).then(function (res) {
        self.article_list = res.result;
      });
    },
    floder_mode_show: function floder_mode_show() {
      this.floder_add_show_flag = !this.floder_add_show_flag;
    },

    article_delete: function article_delete() {
      var self = this;
      API.ARTICLE.remove(this.article_active).then(function () {
        self.article_list_refresh();
        self.article_item_more_crud_element_visible = false;
      });
    },
    article_list_refresh: function article_list_refresh() {
      var self = this;
      API.ARTICLE.list(this.floder_active).then(function (res) {
        self.article_list = res.result;
      });
    },
    article_content_execute: function article_content_execute() {
      if (this.editorQuery == 'editor') {
        this.$refs.editor.Delay.execute();
      }
      if (this.editorQuery == 'codemirror') {
        this.$refs.codemirror.Delay.execute();
      }
    },

    article_item_rename: function article_item_rename(index) {
      this.article_edit_index = index;
    },

    article_item_active: function article_item_active(index) {
      var self = this;

      var article_uid = this.article_list[index].selfuid;
      self.is_listen_change = false;

      this.article_edit_index = index;

      self._acticle_load(article_uid, function () {
        self.$router.push({
          name: "WriteArticle2",
          params: {
            floderid: self.floder_active,
            articleid: self.article_active
          },
          query: {
            editor: self.editorQuery
          }
        });
      });
    },
    _acticle_load: function _acticle_load(article_uid, callback) {
      var self = this;

      (0, _co2.default)(_regenerator2.default.mark(function _callee2() {
        var article_obj;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return API.ARTICLE.content(article_uid, self.editorQuery);

              case 2:
                article_obj = _context2.sent;


                console.log("article load", article_obj);
                self.article_title = article_obj.result.title;

                self.article_content = article_obj.result[self.editorQuery].content;


                self.article_content_style.changed = false;
                self.is_listen_change = true;

                self.floder_active = article_obj.result.floder_uid;
                self.article_active = article_uid;
                if (callback) {
                  callback();
                }

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      })).catch(function (err) {
        console.log("err", err);
      });
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
        self.floder_sort_refresh();
        self.article_list_refresh();

        self.article_add_input = "";
      }).catch(function (err) {
        alert(err);
      });
      this.article_add_visible = false;
    },
    article_add_cancel: function article_add_cancel() {
      this.article_add_visible = false;
    },

    article_item_more_crud_enter: function article_item_more_crud_enter() {
      this.article_item_more_crud_element_visible = true;
      this.$refs.article_item_more.style.left = event.target.offsetLeft + 250 + "px";
      this.$refs.article_item_more.style.top = event.target.offsetParent.offsetTop + 52 + "px";
    },
    Mfloder_mode_show_type_change: function Mfloder_mode_show_type_change() {
      API.CONFIG.floder_sort_type(this.floder_mode_show_type);
    },
    floder_sort_refresh: function floder_sort_refresh() {
      this.floder_list[this.floder_active_index].timemap = new Date().getTime();
      this.floder_active_index = 0;
    },
    floder_delete: function floder_delete() {
      var self = this;
      API.FLODER.remove(this.floder_active).then(function () {
        self.floder_refresh();
        self.floder_item_more_crud_element_visible = false;
      });
    },
    floder_item_more_crud_enter: function floder_item_more_crud_enter(event, index) {
      this.floder_item_more_crud_element_visible = true;
      this.$refs.floder_item_more.style.left = event.target.offsetLeft - 35 + "px";
      this.$refs.floder_item_more.style.top = event.target.offsetParent.offsetTop - 29 + "px";
    },
    floder_item_more_crud_out: function floder_item_more_crud_out(event, index) {
      this.floder_item_more_crud_element_visible = false;
    },
    article_item_more_crud_out: function article_item_more_crud_out() {
      this.article_item_more_crud_element_visible = false;
    },
    floder_item_rename: function floder_item_rename(index) {
      this.floder_edit_index = index;
    },
    floder_item_active: function floder_item_active(index) {
      var self = this;
      var floder_id = self.floder_list[index].floder_uid;
      this.floder_active_index = index;


      this._floder_load(floder_id);
    },
    _floder_load: function _floder_load(floder_uid, callback) {
      var self = this;

      (0, _co2.default)(_regenerator2.default.mark(function _callee3() {
        var article_list;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return API.ARTICLE.list(floder_uid);

              case 2:
                article_list = _context3.sent;


                self.article_list = article_list.result;

                self.floder_active = floder_uid;

                callback();

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      })).catch(function (err) {});
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
    floder_refresh: function floder_refresh() {
      var self = this;
      API.FLODER.list().then(function (res) {
        self.floder_list = res.result;
      });
    },
    floder_add_ok: function floder_add_ok() {
      var self = this;
      API.FLODER.add(this.floder_add_input).then(function () {
        self.floder_refresh();
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
  computed: {
    floder_list_computed: function floder_list_computed() {
      var new_list = this.floder_list;

      switch (this.floder_mode_show_type) {
        case "1":
          new_list.sort(function (p1, p2) {
            return parseInt(p2._id, 16) - parseInt(p1._id, 16);
          });
          break;
        case "2":
          new_list.sort(function (p1, p2) {
            if (p2.timemap === undefined) {
              return -1;
            }
            if (p1.timemap === undefined) {
              return 1;
            }
            return p2.timemap - p1.timemap;
          });
          break;
        case "3":
          new_list.sort(function (p1, p2) {
            if (p2.timemapTotal === undefined) {
              return -1;
            }
            if (p1.timemapTotal === undefined) {
              return 1;
            }
            return p2.timemapTotal - p1.timemapTotal;
          });
          break;
      }

      return new_list;
    }
  },
  created: function created() {
    var currentEditor = this.$route.query.editor;
    if (currentEditor) {
      this.editorQuery = currentEditor;
    }
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

              if (!(self.$route.params.floderid != undefined)) {
                _context4.next = 8;
                break;
              }

              self._floder_load(self.$route.params.floderid, function () {
                if (self.$route.params.articleid != undefined) {
                  self._acticle_load(self.$route.params.articleid);
                }
              });
              _context4.next = 13;
              break;

            case 8:
              self.floder_active = floder_list.result[0].floder_uid;
              _context4.next = 11;
              return API.ARTICLE.list(self.floder_list[0].floder_uid);

            case 11:
              article_list = _context4.sent;

              self.article_list = article_list.result;

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })).catch(function (err) {
      if (err.STATUSCODE === LOGIN_CODE.LOGIN_NO_LOGIN.STATUSCODE) {
        self.$router.push("login");
      }
    });
  },
  mounted: function mounted() {
    var self = this;


    API.CONFIG.getAll().then(function (res) {
      self.floder_mode_show_type = res.result.floder_sort_type;
    });
  },

  watch: {
    $route: function $route() {
      console.log("this.$route.query", this.$route.query);
    }
  }
};

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(13);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _vuex = __webpack_require__(6);

__webpack_require__(23);

__webpack_require__(20);

__webpack_require__(24);

__webpack_require__(22);

__webpack_require__(62);

__webpack_require__(63);

__webpack_require__(64);

__webpack_require__(21);

var _CONSTANT = __webpack_require__(2);

var _index = __webpack_require__(27);

var API = _interopRequireWildcard(_index);

var _co = __webpack_require__(14);

var _co2 = _interopRequireDefault(_co);

var _codemirror = __webpack_require__(4);

var _codemirror2 = _interopRequireDefault(_codemirror);

__webpack_require__(48);

var _Delay = __webpack_require__(42);

var _Delay2 = _interopRequireDefault(_Delay);

var _dndUpload = __webpack_require__(44);

var _dndUpload2 = _interopRequireDefault(_dndUpload);

var _EditorValueAdvance = __webpack_require__(43);

var _EditorValueAdvance2 = _interopRequireDefault(_EditorValueAdvance);

var _ytoolSwitch = __webpack_require__(28);

var _ytoolSwitch2 = _interopRequireDefault(_ytoolSwitch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var marked = __webpack_require__(41);
var renderer = new marked.Renderer();

var radCode = renderer.code;
renderer.code = function (code, lang, escaped) {
    if (lang === 'raw') {
        return '<p class="lang-raw">' + code + '</p>';
    }
    var self = this;

    return radCode.call(self, code, lang, escaped);
};
marked.setOptions({

    gfm: true,
    tables: true,
    breaks: true,
    pedantic: true,
    sanitize: true,
    smartLists: true,
    smartypants: true,
    highlight: function highlight(code, type, sss) {
        return __webpack_require__(40).highlightAuto(code).value;
    }, renderer: renderer
});

var LOGIN_CODE = __webpack_require__(25).CODE;

exports.default = {
    data: function data() {
        return {
            page_mode: 0,
            floder_list: [],
            floder_mode_show_type: "1",
            floder_add_show_switch: function floder_add_show_switch() {},
            floder_add_show_flag: false,
            floder_active: "",
            floder_active_index: 0,
            floder_edit_index: -1,
            floder_add_visible: false,
            floder_add_input: "",
            floder_item_more_crud_element_visible: false,

            article_item_more_crud_element_visible: false,
            article_list: [],
            article_active: "",
            article_edit_index: -1,
            article_add_visible: false,
            article_add_input: "",
            article_title: "",
            article_content: "",
            article_content_style: {
                changed: false,
                saving: false,
                error: false
            },
            editor: "",
            Delay: "",
            onEditorChange: "",
            EVA: ""
        };
    },

    methods: {
        floder_mode_show: function floder_mode_show() {
            this.floder_add_show_switch();
        },
        article_markdown_preview: function article_markdown_preview() {
            if (this.page_mode === 1) {
                this.page_mode = 0;
                return;
            }
            this.page_mode = 1;
        },
        article_delete: function article_delete() {
            var self = this;
            API.ARTICLE.remove(this.article_active).then(function () {
                self.article_list_refresh();
                self.article_item_more_crud_element_visible = false;
            });
        },
        article_list_refresh: function article_list_refresh() {
            var self = this;
            API.ARTICLE.list(this.floder_active).then(function (res) {
                self.article_list = res.result;
            });
        },
        article_content_execute: function article_content_execute() {
            this.Delay.execute();
        },
        article_content_save: function article_content_save(value, title, article_active, floder_uid) {
            var self = this;

            (0, _co2.default)(_regenerator2.default.mark(function _callee() {
                var update;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:

                                self.article_content_style.saving = true;

                                _context.next = 3;
                                return API.ARTICLE.update(value, title, article_active, floder_uid);

                            case 3:
                                update = _context.sent;


                                self.article_content_style.saving = false;
                                self.article_content_style.changed = false;

                                self.floder_sort_refresh();

                                self.article_list_refresh();

                            case 8:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            })).catch(function (err) {
                alert(err.MSG);
            });
        },
        article_item_rename: function article_item_rename(index) {
            this.article_edit_index = index;
        },

        article_item_active: function article_item_active(index) {
            var self = this;

            var article_uid = this.article_list[index].selfuid;

            this.editor.off("change", this.onEditorChange);
            this.article_edit_index = index;

            self.EVA.reset();

            self._acticle_load(article_uid, function () {
                self.$router.push({ name: 'WriteArticle2',
                    params: {
                        floderid: self.floder_active,
                        articleid: self.article_active }
                });
            });
        },
        _acticle_load: function _acticle_load(article_uid, callback) {
            var self = this;
            (0, _co2.default)(_regenerator2.default.mark(function _callee2() {
                var article_obj;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return API.ARTICLE.content(article_uid);

                            case 2:
                                article_obj = _context2.sent;


                                self.article_title = article_obj.result.title;
                                self.EVA.value = article_obj.result.content;

                                self.editor.setValue(self.EVA.value);
                                self.article_content = article_obj.result.content;


                                self.article_content_style.changed = false;
                                self.editor.on("change", self.onEditorChange);

                                self.article_active = article_uid;

                                callback();

                            case 11:
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
                self.floder_sort_refresh();
                self.article_list_refresh();

                self.article_add_input = "";
            }).catch(function (err) {
                alert(err);
            });
            this.article_add_visible = false;
        },
        article_add_cancel: function article_add_cancel() {
            this.article_add_visible = false;
        },

        article_item_more_crud_enter: function article_item_more_crud_enter() {
            this.article_item_more_crud_element_visible = true;
            this.$refs.article_item_more.style.left = event.target.offsetLeft + 250 + "px";
            this.$refs.article_item_more.style.top = event.target.offsetParent.offsetTop + 52 + "px";
        },
        Mfloder_mode_show_type_change: function Mfloder_mode_show_type_change() {
            API.CONFIG.floder_sort_type(this.floder_mode_show_type);
        },
        floder_sort_refresh: function floder_sort_refresh() {
            this.floder_list[this.floder_active_index].timemap = new Date().getTime();
            this.floder_active_index = 0;
        },
        floder_delete: function floder_delete() {
            var self = this;
            API.FLODER.remove(this.floder_active).then(function () {
                self.floder_refresh();
                self.floder_item_more_crud_element_visible = false;
            });
        },
        floder_item_more_crud_enter: function floder_item_more_crud_enter(event, index) {
            this.floder_item_more_crud_element_visible = true;
            this.$refs.floder_item_more.style.left = event.target.offsetLeft - 35 + "px";
            this.$refs.floder_item_more.style.top = event.target.offsetParent.offsetTop - 29 + "px";
        },
        floder_item_more_crud_out: function floder_item_more_crud_out(event, index) {
            this.floder_item_more_crud_element_visible = false;
        },
        article_item_more_crud_out: function article_item_more_crud_out() {
            this.article_item_more_crud_element_visible = false;
        },
        floder_item_rename: function floder_item_rename(index) {
            this.floder_edit_index = index;
        },
        floder_item_active: function floder_item_active(index) {
            var self = this;
            var floder_id = self.floder_list[index].floder_uid;
            this.floder_active_index = index;


            this._floder_load(floder_id);
        },
        _floder_load: function _floder_load(floder_uid, callback) {
            var self = this;

            (0, _co2.default)(_regenerator2.default.mark(function _callee3() {
                var article_list;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return API.ARTICLE.list(floder_uid);

                            case 2:
                                article_list = _context3.sent;


                                self.article_list = article_list.result;

                                self.floder_active = floder_uid;

                                callback();

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            })).catch(function (err) {});
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
        floder_refresh: function floder_refresh() {
            var self = this;
            API.FLODER.list().then(function (res) {
                self.floder_list = res.result;
            });
        },
        floder_add_ok: function floder_add_ok() {
            var self = this;
            API.FLODER.add(this.floder_add_input).then(function () {
                self.floder_refresh();
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
    computed: {
        article_markdown_preview_text: function article_markdown_preview_text() {
            var title = "# " + this.article_title + "\n";

            return marked(title + this.article_content);
        },
        floder_list_computed: function floder_list_computed() {
            var new_list = this.floder_list;

            switch (this.floder_mode_show_type) {
                case "1":
                    new_list.sort(function (p1, p2) {
                        return parseInt(p2._id, 16) - parseInt(p1._id, 16);
                    });
                    break;
                case "2":
                    new_list.sort(function (p1, p2) {
                        if (p2.timemap === undefined) {
                            return -1;
                        }
                        if (p1.timemap === undefined) {
                            return 1;
                        }
                        return p2.timemap - p1.timemap;
                    });
                    break;
                case "3":
                    new_list.sort(function (p1, p2) {
                        if (p2.timemapTotal === undefined) {
                            return -1;
                        }
                        if (p1.timemapTotal === undefined) {
                            return 1;
                        }
                        return p2.timemapTotal - p1.timemapTotal;
                    });
                    break;
            }

            return new_list;
        }
    },
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

                            if (!(self.$route.params.floderid != undefined)) {
                                _context4.next = 8;
                                break;
                            }

                            self._floder_load(self.$route.params.floderid, function () {
                                if (self.$route.params.articleid != undefined) {
                                    self._acticle_load(self.$route.params.articleid);
                                }
                            });
                            _context4.next = 13;
                            break;

                        case 8:
                            self.floder_active = floder_list.result[0].floder_uid;
                            _context4.next = 11;
                            return API.ARTICLE.list(self.floder_list[0].floder_uid);

                        case 11:
                            article_list = _context4.sent;

                            self.article_list = article_list.result;

                        case 13:
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
        var self = this;
        var e = this.$refs.ta1;
        this.editor = _codemirror2.default.fromTextArea(e, {
            mode: 'gfm',
            theme: "zenburn",
            lineWrapping: true,
            extraKeys: {
                "Enter": "newlineAndIndentContinueMarkdownList",
                "Ctrl-S": function CtrlS(cm) {
                    self.Delay.execute();
                }
            }
        });
        this.Delay = new _Delay2.default(5000, function () {
            self.EVA.value = self.editor.getValue();


            self.article_content_save(self.EVA.patch_list, self.article_title, self.article_active, self.floder_active);
        });

        this.onEditorChange = function () {

            self.article_content_style.changed = true;

            self.article_content = self.editor.getValue();

            self.Delay.push();
        };

        this.EVA = new _EditorValueAdvance2.default();

        var code_mirror = document.getElementsByClassName('CodeMirror')[0];
        code_mirror.style.height = window.innerHeight - 106 + "px";
        window.onresize = function () {
            code_mirror.style.height = window.innerHeight - 106 + "px";
        };
        var dnd_upload = new _dndUpload2.default(document.getElementsByClassName("article")[0], {
            onSuccess: function onSuccess(res) {

                var current_line = self.editor.getCursor().line;


                console.log(_CONSTANT.IP);

                var img = "![](" + res.img_url.replace("IPADDRESS", _CONSTANT.IP) + ")";

                self.editor.replaceRange("\r\n\r\n" + img + "\r\n\r\n", { line: current_line, ch: 0 });
            }
        });

        this.floder_add_show_switch = (0, _ytoolSwitch2.default)([function () {
            self.floder_add_show_flag = true;
        }, function () {
            self.floder_add_show_flag = false;
        }]);
        API.CONFIG.getAll().then(function (res) {
            self.floder_mode_show_type = res.result.floder_sort_type;
        });
    }
};

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(13);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = __webpack_require__(93);

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = __webpack_require__(46);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(29);

var _promise2 = _interopRequireDefault(_promise);

var _vuex = __webpack_require__(6);

__webpack_require__(23);

__webpack_require__(20);

__webpack_require__(24);

__webpack_require__(22);

__webpack_require__(21);

__webpack_require__(39);

var _CONSTANT = __webpack_require__(2);

var _index = __webpack_require__(27);

var API = _interopRequireWildcard(_index);

var _co = __webpack_require__(14);

var _co2 = _interopRequireDefault(_co);

var _Delay = __webpack_require__(42);

var _Delay2 = _interopRequireDefault(_Delay);

var _dndUpload = __webpack_require__(44);

var _dndUpload2 = _interopRequireDefault(_dndUpload);

var _EditorValueAdvance = __webpack_require__(43);

var _EditorValueAdvance2 = _interopRequireDefault(_EditorValueAdvance);

var _ytoolSwitch = __webpack_require__(28);

var _ytoolSwitch2 = _interopRequireDefault(_ytoolSwitch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGIN_CODE = __webpack_require__(25).CODE;
var EditorJS = __webpack_require__(73);
var Header = __webpack_require__(75);
var Marker = __webpack_require__(79);
var RawTool = __webpack_require__(81);

var SimpleImage = __webpack_require__(82);
var List = __webpack_require__(78);
var Checklist = __webpack_require__(70);
var Quote = __webpack_require__(80);
var Warning = __webpack_require__(84);
var CodeTool = __webpack_require__(71);
var Delimiter = __webpack_require__(72);
var InlineCode = __webpack_require__(76);
var LinkTool = __webpack_require__(77);
var Embed = __webpack_require__(74);
var Table = __webpack_require__(83);

exports.default = {
  props: ["data"],
  data: function data() {
    return {
      floder_list: [],
      visible: {
        page_mode: 0,
        treeview: 1,
        editor: 1,
        markdown: 0
      },
      search_mode_show_flag: false,
      search_mode_content: "",
      floder_add_show_flag: false,
      floder_active: "",
      floder_active_index: 0,
      floder_edit_index: -1,
      floder_add_visible: false,
      floder_add_input: "",
      floder_item_more_crud_element_visible: false,
      article_item_more_crud_element_visible: false,
      article_list: [],
      article_active: "",
      article_edit_index: -1,
      article_add_visible: false,
      article_add_input: "",
      article_title: "",
      article_content: "",
      article_content_style: {
        changed: false,
        saving: false,
        error: false
      },
      editor: "sb",
      Delay: "",
      onEditorChange: "",
      EVA: "",
      article_markdown_preview_text: ""
    };
  },

  methods: {
    renderEditor: function renderEditor(data) {
      console.log("renderEditor", data);
      var self = this;
      if (data && data != []) {
        try {
          data = JSON.parse(data);
        } catch (e) {
          data = [{ type: "paragraph", data: { text: data } }];
        }
      }
      if (this.editor.destroy) {
        this.editor.destroy();
      }

      this.editor = new EditorJS({
        holderId: "ta1",

        tools: {
          header: {
            class: Header,
            inlineToolbar: ["link"],
            config: {
              placeholder: "Header"
            },
            shortcut: "CMD+SHIFT+H"
          },

          image: {
            class: SimpleImage,
            inlineToolbar: ["link"]
          },
          list: {
            class: List,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+L"
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author"
            },
            shortcut: "CMD+SHIFT+O"
          },
          warning: Warning,
          marker: {
            class: Marker,
            shortcut: "CMD+SHIFT+M"
          },
          code: {
            class: CodeTool,
            shortcut: "CMD+SHIFT+C"
          },
          delimiter: Delimiter,
          inlineCode: {
            class: InlineCode,
            shortcut: "CMD+SHIFT+C"
          },
          linkTool: LinkTool,
          embed: Embed,
          table: {
            class: Table,
            inlineToolbar: true,
            shortcut: "CMD+ALT+T"
          },
          raw: RawTool
        },

        data: { blocks: data },
        onReady: function onReady() {},
        onChange: function onChange() {
          console.log("something changed");

          self.onEditorChange();
        }
      });
      window.editor = this.editor;
    },
    saveP: function saveP() {
      var _this = this;

      return new _promise2.default(function (reslove, reject) {
        _this.editor.save().then(function (savedData) {
          reslove(savedData);
        });
      });
    },


    floder_sort_refresh: function floder_sort_refresh() {
      this.floder_list[this.floder_active_index].timemap = new Date().getTime();
      this.floder_active_index = 0;
    }

  },

  watch: {
    data: {
      handler: function handler() {
        console.log("watch data");
        this.EVA.reset();
        this.EVA.value = this.data || "";
        this.renderEditor(this.data);
      }
    }
  },
  mounted: function mounted() {
    var self = this;

    this.Delay = new _Delay2.default(5000, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var saverData;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return self.saveP();

            case 2:
              saverData = _context.sent;

              console.log('delay');
              self.EVA.value = (0, _stringify2.default)(saverData.blocks);


              self.$emit("save", { content: self.EVA.patch_list, editor: "editor" });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));

    this.onEditorChange = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var saverData;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              self.$emit('changed');

              _context2.next = 3;
              return self.saveP();

            case 3:
              saverData = _context2.sent;

              self.Delay.push();

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    this.EVA = new _EditorValueAdvance2.default();
  }
};

/***/ })

},[358]);
//# sourceMappingURL=app.0ec61f86951665c7eb68.js.map