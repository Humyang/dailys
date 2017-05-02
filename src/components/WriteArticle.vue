<template>
    <div class="write_article_wrap">
        <div 
        @mouseleave="floder_item_more_crud_out($event)" 
        ref="floder_item_more" id="floder_item_more" 
        v-show="floder_item_more_crud_element_visible" 
        class="floder-cover">
            <div class="background"></div>
            <ul class="subitem">
                <li ><i class="iconfont icon-xiugai"></i></li>
                <li @click="floder_delete"><i class="iconfont icon-shanchu"></i></li>
            </ul>
        </div>
        <div 
        @mouseleave="article_item_more_crud_out($event)" 
        ref="article_item_more" id="article_item_more" 
        v-show="article_item_more_crud_element_visible" 
        class="floder-cover">
            <div class="background"></div>
            <ul class="subitem">
                <li ><i class="iconfont icon-xiugai"></i></li>
                <li @click="article_delete"><i class="iconfont icon-shanchu"></i></li>
            </ul>
        </div>
        <template v-if="page_mode===0">
            <div class="floder">
                <a class="btn back_home">回到首页</a>
                <p class="p_add" @click="floder_add_show"><i class="i_add">+</i>新建文集</p>
                <template v-if="floder_add_visible">
                    <div class="add_wrap">
                        <input v-model="floder_add_input" placeholder="输入文集名称" type="" name="">
                        <a @click="floder_add_ok" class="btn btn_ok" >保存</a>
                        <a @click="floder_add_cancel" class="btn btn_cancel" >取消</a>
                    </div>
                </template>
                <ul class="item">
                    <li v-for="(item,index) in floder_list"
                        :class="{active:floder_active === floder_list[index].floder_uid,editor:floder_edit_index===index}"
                        @click="floder_item_active(index)" >
                        <template v-if="index!=floder_edit_index">
                            {{item.name}}
                           <!--  @click.prevent="floder_item_rename(index)"  -->
                            <i @click="floder_item_more_crud_enter($event,index)"
                               class="iconfont icon-gengduo i1"></i>
                        </template>
                        <template v-if="index===floder_edit_index">
                            <input :placeholder="item.name"type="" name="">
                            <a @click="floder_edit_ok" class="btn btn_ok" >保存</a>
                            <a @click="floder_edit_cancel(index)" class="btn btn_cancel" >取消</a>
                        </template>
                    </li>
                </ul>
            </div>
            <div class="document">
                <p class="p_add" @click="article_add_show"><i class="i_add">+</i>新建文章</p>
                <template v-if="article_add_visible">
                    <div class="add_wrap">
                        <input v-model="article_add_input" placeholder="输入文章名称" type="" name="">
                        <a @click="article_add_ok" class="btn btn_ok" >保存</a>
                        <a @click="article_add_cancel" class="btn btn_cancel" >取消</a>
                    </div>
                </template>
                <ul >
                    <template v-for="(item,index) in article_list">
                        <li @click="article_item_active(index)"
                            :class="{active:article_active === article_list[index].selfuid,editor:article_edit_index===index}">
                            <i class="i1"></i>
                            <p class="p1">{{item.title}}</p>
                            <p class="p2">------</p>
                            <i v-if="article_edit_index === index"
                               @click="article_item_more_crud_enter($event,index)"
                            class="iconfont icon-gengduo i2"></i>
                        </li>
                    </template>
                </ul>
            </div>
        </template>
        <div class="article"
            :class="{md_preview:page_mode === 1}" >
            <input class="i1" type="text" placeholder="无标题文章" v-model="article_title">
            <p class="p1">
                <i @click="article_markdown_preview" class="iconfont icon-shu i i2 "></i>
                <i  @click="article_content_execute"
                    class="iconfont icon-baocun i i1 animated" 
                    :class="{saving:article_content_style.saving,
                           changed:article_content_style.changed}"></i>
            </p>
            <textarea ref="ta1" name="" id="ta1" cols="30" rows="10"></textarea>
        </div>
        <div v-show="page_mode===1" 
             class = "markdown_parse_preview_wrap">
            <div id="markdown_parse_preview" v-html="article_markdown_preview_text">
                
            </div>
        </div>
    </div>
</template>
<!-- @click="article_content_save" -->
<script>
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'

import '../css/btn.css'
import 'animate.css'
import '../css/custom_animate.css'
import '../css/WriteArticle.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/zenburn.css'
import '../css/CodeMirror_Theme.css'


import '../../node_modules/highlight.js/styles/agate.css'
import '../css/custom_markdown_preview.css'

import {
    PREDEFINEDIP
} from '../../serve/PREDEFINED/CONSTANT.js'
var marked = require('marked');
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});
// marked.setOptions({
//   highlight: function (code) {
//     return require('highlight.js').highlightAuto(code).value;
//   }
// });
// var req = require.context("codemirror/theme/", true, /\.css/);
// req.keys().forEach(function(key){
//     req(key);
// });


import * as API from '../../serve/fontend/index.js'
import co from 'co'
import CodeMirror from 'codemirror'
import 'codemirror/mode/gfm/gfm.js'
import Delay from '../../serve/fontend/Obj/Delay.js'
import dndUpload from '../../serve/fontend/Obj/dndUpload/dndUpload.js'
// import DMP from '../../serve/fontend/Obj/Text_Diff_Patch.js'
// import TDP from '../../serve/fontend/Obj/Text_Diff_Patch.js'

import EVA from '../../serve/fontend/Obj/EditorValueAdvance.js'

var LOGIN_CODE =  require('flogin').CODE

export default {
  data () {
    return {
        page_mode:0,//0:normal 1:markdown preview 
        floder_list:[],
        floder_active:"",
        floder_edit_index:-1,
        floder_add_visible:false,
        floder_add_input:"",
        floder_item_more_crud_element_visible:false,
        // article_markdown_preview_text:"",
        article_item_more_crud_element_visible:false,
        article_list:[],
        article_active:"",
        article_edit_index:-1,
        article_add_visible:false,
        article_add_input:"",
        article_title:"",
        article_content:"",
        article_content_style:{
            changed:false,
            saving:false,
            error:false
        },
        editor:"",
        Delay:"",
        onEditorChange:"",
        EVA:""
    }
  },
  methods:{
        article_markdown_preview:function(){
            if(this.page_mode === 1){
                this.page_mode = 0
                return 
            }
            this.page_mode = 1
        },
        article_delete:function(){
            let self = this
            API.ARTICLE.remove(this.article_active)
            .then(function(){
                self.article_list_refresh()
                self.article_item_more_crud_element_visible = false
            })
        },
        article_list_refresh:function(){
            let self = this
            API.ARTICLE.list(this.floder_active)
            .then(function(res){
                self.article_list = res.result
            })
        },
        article_content_execute:function(){
            this.Delay.execute()
        },
        article_content_save:function(value,title,article_active){
            let self = this

            co(function*(){
                
                self.article_content_style.saving = true

                let update = yield API.ARTICLE.update(value,title,article_active)

                self.article_content_style.saving = false
                self.article_content_style.changed = false

                self.article_list_refresh()
            })
            .catch(function(err){
                alert(err.MSG)
            })
        },
        article_item_rename:function(index){
            this.article_edit_index = index
        },
        article_item_active:function(index){
            let self = this
            this.article_active =  this.article_list[index].selfuid
            this.editor.off("change",this.onEditorChange)
            this.article_edit_index = index

            self.EVA.reset()
            
            co(function*(){
                let article_obj = yield API.ARTICLE.content(self.article_active,self.article_active)

                self.article_title = article_obj.result.title
                self.EVA.value = article_obj.result.content

                self.editor.setValue(self.EVA.value)
                self.article_content = article_obj.result.content
                // self.old_text = article_obj.result.content

                self.article_content_style.changed = false
                self.editor.on("change",self.onEditorChange)

            })
            .catch(function(err){
                
            })
        },
        article_edit_cancel(index){
            this.article_edit_index = -1
        },
        article_edit_ok(){
            this.article_edit_index = -1
        },
        article_add_show:function(){
            this.article_add_visible = true
        },
        article_add_ok(){
            let self = this
            let floder_uid = self.floder_active
            API.ARTICLE.add(this.article_add_input,floder_uid)
            .then(function(){
                // API.ARTICLE.list(floder_uid)
                // .then(function(res){
                //     self.article_list = res.result
                // })

                self.article_list_refresh()

                self.article_add_input = ""
            })
            .catch(function(err){
                alert(err)
            })
            this.article_add_visible = false
        },
        article_add_cancel(){
             this.article_add_visible = false
        },
        article_item_more_crud_enter:function(){
            this.article_item_more_crud_element_visible = true
            this.$refs.article_item_more.style.left=event.target.offsetLeft+250+"px";
            this.$refs.article_item_more.style.top=event.target.offsetParent.offsetTop+52+"px";
        },
        floder_delete:function(){
            let self = this
            API.FLODER.remove(this.floder_active)
            .then(function(){
                self.floder_refresh()
                self.floder_item_more_crud_element_visible = false
            })
        },
        floder_item_more_crud_enter:function(event,index){
            this.floder_item_more_crud_element_visible = true
            this.$refs.floder_item_more.style.left=event.target.offsetLeft-35+"px";
            this.$refs.floder_item_more.style.top=event.target.offsetParent.offsetTop-29+"px";

            // console.log(123)
        },
        floder_item_more_crud_out:function(event,index){
            this.floder_item_more_crud_element_visible = false
        },
        article_item_more_crud_out:function(){
            this.article_item_more_crud_element_visible = false
        },
        floder_item_rename:function(index){
            this.floder_edit_index = index
        },
        floder_item_active:function(index){
            let self = this
            co(function*(){
                let article_list = yield API.ARTICLE.list(self.floder_list[index].floder_uid)
                self.article_list = article_list.result
            })
            .catch(function(err){
                
            })
            this.floder_active = this.floder_list[index].floder_uid
        },
        floder_edit_cancel(index){
            this.floder_edit_index = -1
        },
        floder_edit_ok(){
            this.floder_edit_index = -1
        },
        floder_add_show:function(){
            this.floder_add_visible = true
        },
        floder_refresh:function(){
            let self = this
            API.FLODER.list()
            .then(function(res){
                self.floder_list = res.result

            })
        },
        floder_add_ok(){
            let self = this
            API.FLODER.add(this.floder_add_input)
            .then(function(){
                self.floder_refresh()
                self.floder_add_input = ""
            })
            .catch(function(err){
                alert(err)
            })
            this.floder_add_visible = false
        },
        floder_add_cancel(){
            this.floder_add_visible = false
        }
  },
  computed: {
    article_markdown_preview_text:function(){
        let title = "# " + this.article_title+"\n"
        // self.EVA.value = self.editor.getValue()
        return marked(title+this.article_content)
    }
  },
  created(){
    let self = this

    co(function*(){
            let floder_list = yield API.FLODER.list()
            self.floder_list = floder_list.result
            self.floder_active = floder_list.result[0].floder_uid
            let article_list = yield API.ARTICLE.list(self.floder_list[0].floder_uid)
            self.article_list = article_list.result
        })
        .catch(function(err){
            if(err.STATUSCODE === LOGIN_CODE.LOGIN_NO_LOGIN.STATUSCODE){
                self.$router.push('login')
            }
        })
  },
  mounted(){
    let self = this
    var e = this.$refs.ta1
    this.editor = CodeMirror.fromTextArea(e, {
        mode: 'gfm',
        theme: "zenburn",
        lineWrapping:true,
        extraKeys: {    
            "Enter": "newlineAndIndentContinueMarkdownList",
            "Ctrl-S":function(cm) {
                self.Delay.execute()
            }
        }
    });
    this.Delay = new Delay(5000,function(){
        // self.old_text =""
        // let new_text = self.editor.getValue()
        self.EVA.value = self.editor.getValue()
        // console.log(self.EVA.diff_result)

        self.article_content_save(self.EVA.patch_list,self.article_title,self.article_active)
    })

    this.onEditorChange = function(){
        // 为了使 editor off 执行生效，只能将push操作封装起来
        // 因为 on 和 off 是根据 function 来的
        // 如果使用匿名函数 function(){self.Delay.push()}
        // 会无法 off 回失效
        
        self.article_content_style.changed = true

        // 为 article_markdown_preview_text 属性提供变量
        self.article_content = self.editor.getValue()
        // self.article_content = self.editor.getValue()
        // self.EVA.value = self.editor.getValue()
        // console.log(self.EVA.diff_result)
        self.Delay.push()
    }
    
    this.EVA = new EVA()

    var code_mirror = document.getElementsByClassName('CodeMirror')[0]
    code_mirror.style.height = window.innerHeight - 106 + "px"
    window.onresize = function() {
        code_mirror.style.height = window.innerHeight - 106 + "px"
    }
    var dnd_upload = new dndUpload(document.getElementsByClassName("article")[0],{
        // serve_url:'http://localhost:8202/upload',
        onSuccess:function(res){
            // console.log('res',res)
            
            let current_line = self.editor.getCursor().line
            // console.log(self.editor.getCursor())
            let img = "![](" + res.img_url.replace("IPADDRESS",PREDEFINEDIP) + ")"

            self.editor.replaceRange("\r\n\r\n"+img+"\r\n\r\n",{line:current_line,ch:0})
        }
    })
  }
}
</script>
