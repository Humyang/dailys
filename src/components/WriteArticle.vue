<template>
    <div class="write_article_wrap">
        <div class="floder">
            <p class="p_add" @click="floder_add_show"><i class="i_add">+</i>新建文集</p>
            <template v-if="floder_add_visible">
                <div class="add_wrap">
                    <input v-model="floder_add_input" placeholder="输入文集名称" type="" name="">
                    <a @click="floder_add_ok" class="btn btn_ok" >保存</a>
                    <a @click="floder_add_cancel" class="btn btn_cancel" >取消</a>
                </div>
            </template>
            <ul>
                <li v-for="(item,index) in floder_list"
                    :class="{active:floder_active === index,editor:floder_edit_index===index}"
                    @click="floder_item_active(index)" >
                    <template v-if="index!=floder_edit_index">
                        {{item.name}}
                        <i @click.prevent="floder_item_rename(index)" class="iconfont icon-xiugai i1"></i>
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
            <ul>
                <template v-for="(item,index) in article_list">
                    <li @click="article_item_active(index)"
                        :class="{active:article_active === index,editor:article_edit_index===index}">
                        <i class="i1"></i>
                        <p class="p1">{{item.title}}</p>
                        <p class="p2">------</p>
                    </li>
                </template>
            </ul>
        </div>
        <div class="article">
            <input class="i1" type="text" placeholder="无标题文章">
            <p class="p1">
                <i class="iconfont icon-baocun i1"></i>
            </p>
            <textarea ref="ta1" name="" id="ta1" cols="30" rows="10"></textarea>
        </div>
    </div>
</template>

<script>
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
import '../css/btn.css'
import '../css/WriteArticle.css'
import * as API from '../../serve/fontend/index.js'
import co from 'co'
export default {
  data () {
    return {
        floder_list:[],
        floder_active:0,
        floder_edit_index:-1,
        floder_add_visible:false,
        floder_add_input:"",
        article_list:[],
        article_active:0,
        article_edit_index:-1,
        article_add_visible:false,
        article_add_input:"",
    }
  },
  methods:{
    article_item_rename:function(index){
        this.article_edit_index = index
    },
    article_item_active:function(index){
        this.article_active = index
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
         this.article_add_visible = false
    },
    article_add_cancel(){
         this.article_add_visible = false
    },
    floder_item_rename:function(index){
        this.floder_edit_index = index
    },
    floder_item_active:function(index){
        this.floder_active = index
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

            let article_list = yield API.ARTICLE.list()
            self.article_list = article_list.result
        })
        .catch(function(err){
            
        })
    
  },
  mounted(){
    var e = this.$refs.ta1
    window.onresize = function() {
        e.style.height = window.innerHeight - 106 + "px"
    }
    e.style.height = window.innerHeight - 106 + "px"
  }
}
</script>
