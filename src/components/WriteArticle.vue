<template>
    <div class="write_article_wrap">
        <div 
        @mouseleave="floder_item_more_crud_out($event)" 
        ref="floder_item_more" id="floder_item_more" v-show="floder_item_more_crud_element_visible" class="floder-cover">
            <div class="background"></div>
            <ul class="subitem">
                <li ><i class="iconfont icon-xiugai"></i></li>
                <li><i class="iconfont icon-shanchu"></i></li>
            </ul>
        </div>
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
                    </li>
                </template>
            </ul>
        </div>
        <div class="article">
            <input class="i1" type="text" placeholder="无标题文章" v-model="article_title">
            <p class="p1">
                <i @click="article_content_save" class="iconfont icon-baocun i1"></i>
            </p>
            <textarea v-model="article_content" ref="ta1" name="" id="ta1" cols="30" rows="10"></textarea>
        </div>
    </div>
</template>

<script>
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
import '../css/btn.css'
import '../css/WriteArticle.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/zenburn.css'
import '../css/CodeMirror_Theme.css'
// require("codemirror/theme/3024-day.css");
// var req = require.context("codemirror/theme/", true, /\.css/);
// req.keys().forEach(function(key){
//     req(key);
// });


import * as API from '../../serve/fontend/index.js'
import co from 'co'
import CodeMirror from 'codemirror'
import 'codemirror/mode/gfm/gfm.js'

var LOGIN_CODE =  require('flogin').CODE

export default {
  data () {
    return {
        floder_list:[],
        floder_active:"",
        floder_edit_index:-1,
        floder_add_visible:false,
        floder_add_input:"",
        floder_item_more_crud_element_visible:false,
        article_list:[],
        article_active:"",
        article_edit_index:-1,
        article_add_visible:false,
        article_add_input:"",
        article_title:"",
        article_content:"",
        editor:""
    }
  },
  methods:{
        article_list_refresh:function(){
            let self = this
            API.ARTICLE.list(this.floder_active)
            .then(function(res){
                self.article_list = res.result
            })
        },
        article_content_save:function(){
            let self = this
            co(function*(){
                let update = yield API.ARTICLE.update(self.editor.getValue(),self.article_title,self.article_active)
                self.article_list_refresh()
            }).catch(function(err){
            })
        },
        article_item_rename:function(index){
            this.article_edit_index = index
        },
        article_item_active:function(index){
            this.article_active =  this.article_list[index].selfuid

            let self = this
            co(function*(){
                let article_obj = yield API.ARTICLE.content(self.article_active,self.article_active)

                self.article_title = article_obj.result.title
                self.editor.setValue(article_obj.result.content)
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
        floder_item_more_crud_enter:function(event,index){
            this.floder_item_more_crud_element_visible = true
            this.$refs.floder_item_more.style.left=event.target.offsetLeft-35+"px";
            this.$refs.floder_item_more.style.top=event.target.offsetParent.offsetTop-29+"px";

            // console.log(123)
        },
        floder_item_more_crud_out:function(event,index){
            this.floder_item_more_crud_element_visible = false
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
        floder_add_ok(){
            let self = this
            API.FLODER.add(this.floder_add_input)
            .then(function(){
                API.FLODER.list()
                .then(function(res){
                    self.floder_list = res.result
                })
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
                // console.log(err)
                self.$router.push('login')
            }
        })
    
  },
  mounted(){
    var e = this.$refs.ta1
    this.editor = CodeMirror.fromTextArea(e, {
        mode: 'gfm',
        theme: "zenburn",
        extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
    });
    var code_mirror = document.getElementsByClassName('CodeMirror')[0]
    code_mirror.style.height = window.innerHeight - 126 + "px"
    window.onresize = function() {
        code_mirror.style.height = window.innerHeight - 106 + "px"
    }
  }
}
</script>
