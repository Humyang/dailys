<template>
    <div class="write_article_wrap">
        <div class="floder">
            <p class="p_add"><i class="i_add">+</i>新建文集</p>
            <ul>
                <li v-for="(item,index) in floder_list"
                    :class="{active:floder_active === index}"
                    @click.prevent="clickFloder(index)" >
                    {{item.name}}
                </li>
            </ul>
        </div>
        <div class="document">
            <p class="p_add"><i class="i_add">+</i>新建文章</p>
            <ul>
                <li class="active">
                    <i class="i1"></i>
                    <p class="p1">无标题文章</p>
                    <p class="p2">pop_pic:"#ban_pic2",//弹出框图片框架</p>
                </li>
                <li>
                    <i class="i1"></i>
                    <p class="p1">无标题文章</p>
                    <p class="p2">pop_pic:"#ban_pic2",//弹出框图片框架</p>
                </li>
                <li>
                    <i class="i1"></i>
                    <p class="p1">无标题文章</p>
                    <p class="p2">pop_pic:"#ban_pic2",//弹出框图片框架</p>
                </li>
                <li>
                    <i class="i1"></i>
                    <p class="p1">无标题文章</p>
                    <p class="p2">pop_pic:"#ban_pic2",//弹出框图片框架</p>
                </li>
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

import '../css/WriteArticle.css'
import * as API from '../../serve/fontend/index.js'
export default {
  data () {
    return {
        floder_list:[],
        floder_active:0
    }
  },
  methods:{
    clickFloder:function(index){
        this.floder_active = index
    }
  },
  computed: {
    
  },
  created(){
    let self = this
    API.FLODER.list()
    .then(function(res){
        self.floder_list = res.result
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
