<template>
    <div class="write_article_wrap">
        <div class="floder">
            <p class="p_add"><i class="i_add">+</i>新建文集</p>
            <ul>
                <li>脚本</li>
                <li class="active">日志</li>
                <li>数据库</li>
                <li>React</li>
                <li>前端布局</li>
                <li>微信小程序</li>
                <li>单元测试</li>
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
            <textarea name="" id="ta1" cols="30" rows="10"></textarea>
        </div>
    </div>
</template>

<script>
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'

import '../css/WriteArticle.css'

export default {
  data () {
    return {
        aa:''
    }
  },
  methods:{
  },
  computed: {
    
  },
  ready(){
    var e = document.getElementById("ta1")
    window.onresize = function() {
        e.style.height = window.innerHeight - 106 + "px"
    }
    e.style.height = window.innerHeight - 106 + "px"
  }
}
</script>
