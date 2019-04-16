<template>
  <div class="write_article_wrap">
    <div
      @mouseleave="floder_item_more_crud_out($event)"
      ref="floder_item_more"
      id="floder_item_more"
      v-show="floder_item_more_crud_element_visible"
      class="floder-cover"
    >
      <div class="background"></div>
      <ul class="subitem">
        <li>
          <i class="iconfont icon-xiugai"></i>
        </li>
        <li @click="floder_delete">
          <i class="iconfont icon-shanchu"></i>
        </li>
      </ul>
    </div>
    <div
      @mouseleave="article_item_more_crud_out($event)"
      ref="article_item_more"
      id="article_item_more"
      v-show="article_item_more_crud_element_visible"
      class="floder-cover"
    >
      <div class="background"></div>
      <ul class="subitem">
        <li>
          <i class="iconfont icon-xiugai"></i>
        </li>
        <li @click="article_delete">
          <i class="iconfont icon-shanchu"></i>
        </li>
      </ul>
    </div>
    <template v-if="visible.treeview===1">
      <div class="floder">
        <a class="btn back_home" href="/">回到首页</a>
        <p class="p_add" @click="floder_add_show">
          <i class="i_add">+</i>新建文集
        </p>
        <p class="list_mode">
          <i @click="floder_mode_show" class="iconfont icon-zhankai"></i>
          <i @click="search_mode_show" class="iconfont icon-icon1460187848267"></i>
        </p>
        <div v-show="floder_add_show_flag" class="list_mode_group">
          <p class="p1">文集排序方式</p>
          <select v-model="floder_mode_show_type" @change="Mfloder_mode_show_type_change" name id>
            <option value="1">创建日期</option>
            <option value="2">最近使用</option>
            <option value="3">使用频率</option>
          </select>
        </div>
        <div v-show="search_mode_show_flag" class="list_mode_group">
          <p class="p1">搜索</p>
          <input v-model="search_mode_content" class="search" type="text" placeholder="搜索文集和文章">
          <a @click="search_mode_ok" class="btn btn_ok" href="#">确定</a>
        </div>
        <template v-if="floder_add_visible">
          <div class="add_wrap">
            <input v-model="floder_add_input" placeholder="输入文集名称" type name>
            <a @click="floder_add_ok" class="btn btn_ok">保存</a>
            <a @click="floder_add_cancel" class="btn btn_cancel">取消</a>
          </div>
        </template>
        <ul class="item">
          <li
            v-for="(item,index) in floder_list_computed"
            :class="{active:floder_active === floder_list[index].floder_uid,editor:floder_edit_index===index}"
            :key="index"
            @click="floder_item_active(index)"
          >
            <template v-if="index!=floder_edit_index">
              {{index+1+'、'+item.name}}
              <!--  @click.prevent="floder_item_rename(index)"  -->
              <i
                @click="floder_item_more_crud_enter($event,index)"
                class="iconfont icon-gengduo i1"
              ></i>
            </template>
            <template v-if="index===floder_edit_index">
              <input :placeholder="item.name" type name>
              <a @click="floder_edit_ok" class="btn btn_ok">保存</a>
              <a @click="floder_edit_cancel(index)" class="btn btn_cancel">取消</a>
            </template>
          </li>
        </ul>
      </div>
      <div class="document">
        <p class="p_add" @click="article_add_show">
          <i class="i_add">+</i>新建文章
        </p>
        <template v-if="article_add_visible">
          <div class="add_wrap">
            <input v-model="article_add_input" placeholder="输入文章名称" type name>
            <a @click="article_add_ok" class="btn btn_ok">保存</a>
            <a @click="article_add_cancel" class="btn btn_cancel">取消</a>
          </div>
        </template>
        <ul>
          <template v-for="(item,index) in article_list">
            <li
              @click="article_item_active(index)"
              :key="index"
              :class="{active:article_active === article_list[index].selfuid,editor:article_edit_index===index}"
            >
              <i class="i1"></i>
              <p class="p1">{{item.title}}</p>
              <p class="p2">------</p>
              <i
                v-if="article_edit_index === index"
                @click="article_item_more_crud_enter($event,index)"
                class="iconfont icon-gengduo i2"
              ></i>
            </li>
          </template>
        </ul>
      </div>
    </template>
    <div
      class="article"
      :class="{md_preview:visible.markdown === 1,
                    full:visible.page_mode === 2}"
    >
      <input
        v-if="visible.page_mode!=2"
        class="i1"
        type="text"
        placeholder="无标题文章"
        v-model="article_title"
      >
      <p class="p1">
        <!-- 预览 -->
        <i
          @click="visible_editor_markdown"
          class="iconfont icon-shu i i2"
          :class="{active:visible.page_mode===1}"
        ></i>
        <!-- 全屏 -->
        <i
          @click="visible_only_editor"
          class="iconfont icon-quanping i i2"
          :class="{active:visible.page_mode===2}"
        ></i>
        <!-- 切换编辑器 -->
        <i
          @click="change_edtior"
          class="iconfont icon-quanping i i2"
          :class="{active:visible.page_mode===2}"
        ></i>
        <i @click="article_deploy" class="iconfont icon-yijingfabu i i1 animated"></i>
        <i
          @click="article_content_execute"
          class="iconfont icon-baocun i i1 animated"
          :class="{saving:article_content_style.saving,
                           changed:article_content_style.changed}"
        ></i>
        <i @click="article_markdown_preview" class="iconfont icon-fabu i i2"></i>
      </p>
      <editor
        v-if="editorQuery==='editor'"
        ref="editor"
        :data="article_content"
        @save="article_content_save"
        @changed="article_content_style.changed=true"
      />
      <editor-codemirror
        v-if="editorQuery==='codemirror'"
        ref="codemirror"
        :data="article_content"
        @save="article_content_save"
        @changed="article_content_style.changed=true"
      />
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import "../css/btn.css";
import "animate.css";
import "../css/custom_animate.css";
import "../css/WriteArticle.css";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/zenburn.css";
// import "../css/CodeMirror_Theme.css";

// ../node_modules/highlight.js/styles/pojoaque.css
import "../../node_modules/highlight.js/styles/pojoaque.css";
import "../../serve/backend/views/css/topic.css";

import { IP } from "../../serve/PREDEFINED/CONSTANT.js";

import * as API from "../../serve/fontend/index.js";
import co from "co";

// import EVA from "../../serve/fontend/Obj/EditorValueAdvance.js";

import SwitchF from "../../vendors/ytool.switch.js";

var LOGIN_CODE = require("flogin").CODE;
import editor from "./editor";
import editorCodemirror from "./CodeMirror";
export default {
  components: {
    editor,
    editorCodemirror
  },
  data() {
    return {
      editorQuery: "codemirror",
      is_listen_change: false,
      floder_list: [],
      visible: {
        page_mode: 0, //0:normal:treeview editor markdown 1:editor & markdown preview 2 only editor
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
      // EVA: "",
      article_markdown_preview_text: ""
    };
  },
  methods: {
    change_edtior: function() {
      // this.$route.push()
      // console.log("this.$route.query",this.$route.query)
      let currentEditor = this.$route.query.editor;
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
    article_content_save: function(obj) {
      let self = this;
      console.log("article_content_save",obj)
      co(function*() {
        self.article_content_style.saving = true;
        let update = yield API.ARTICLE.update(
          obj.content,
          self.article_title,
          self.article_active,
          self.floder_active,
          self.editorQuery
        );

        self.article_content_style.saving = false;
        self.article_content_style.changed = false;

        self.floder_sort_refresh();

        self.article_list_refresh();
      }).catch(function(err) {
        alert(err.MSG);
      });
    },
    //   发布文章
    article_deploy() {
      API.ARTICLE.deploy(this.article_active);
    },

    visible_only_editor: function() {
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
    visible_editor_markdown: function() {
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
    article_markdown_preview: function() {
      if (this.page_mode === 1) {
        this.page_mode = 0;
        return;
      }
      this.page_mode = 1;
    },
    search_mode_show: function() {
      this.search_mode_show_flag = !this.search_mode_show_flag;
    },
    search_mode_ok: function() {
      // search
      var self = this;
      API.ARTICLE.search(this.search_mode_content).then(function(res) {
        // console.log(res)
        self.article_list = res.result;
      });
    },
    floder_mode_show: function() {
      // var self = this
      // console.log(123)
      // this.floder_add_show_switch()
      this.floder_add_show_flag = !this.floder_add_show_flag;
    },

    article_delete: function() {
      let self = this;
      API.ARTICLE.remove(this.article_active).then(function() {
        self.article_list_refresh();
        self.article_item_more_crud_element_visible = false;
      });
    },
    article_list_refresh: function() {
      let self = this;
      API.ARTICLE.list(this.floder_active).then(function(res) {
        self.article_list = res.result;
      });
    },
    article_content_execute: function() {
      // this.Delay.execute();
      if(this.editorQuery=='editor'){
        this.$refs.editor.Delay.execute();
      }
      if(this.editorQuery=='codemirror'){
        this.$refs.codemirror.Delay.execute();
      }
    },

    article_item_rename: function(index) {
      this.article_edit_index = index;
    },

    article_item_active: function(index) {
      let self = this;

      let article_uid = this.article_list[index].selfuid;
      self.is_listen_change = false;
      //   this.editor.off("change", this.onEditorChange);
      this.article_edit_index = index;
      // self.EVA.reset();
      self._acticle_load(article_uid, function() {
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
    _acticle_load: function(article_uid, callback) {
      let self = this;

      co(function*() {
        let article_obj = yield API.ARTICLE.content(article_uid,self.editorQuery);

        console.log("article load", article_obj);
        self.article_title = article_obj.result.title;
        // self.EVA.value = article_obj.result.content;

        // self.editor.setValue(self.EVA.value);
        // let saverData = yield self.saveP();
        // self.editor.configuration.blocks = saverData
        self.article_content = article_obj.result[self.editorQuery].content;
        // self.editor.render(JSON.parse(self.article_content))
        // self.renderEditor(self.article_content);
        // setTimeout(() => {
        //   self.article_markdown_preview_text = marked(self.article_content);
        // }, 100);

        // self.old_text = article_obj.result.content

        self.article_content_style.changed = false;
        self.is_listen_change = true;
        // self.editor.on("change", self.onEditorChange);
        self.floder_active = article_obj.result.floder_uid;
        self.article_active = article_uid;
        if (callback) {
          callback();
        }
      }).catch(function(err) {
        console.log("err", err);
      });
    },
    article_edit_cancel(index) {
      this.article_edit_index = -1;
    },
    article_edit_ok() {
      this.article_edit_index = -1;
    },
    article_add_show: function() {
      this.article_add_visible = true;
    },
    article_add_ok() {
      let self = this;
      let floder_uid = self.floder_active;
      API.ARTICLE.add(this.article_add_input, floder_uid)
        .then(function() {
          self.floder_sort_refresh();
          self.article_list_refresh();

          self.article_add_input = "";
        })
        .catch(function(err) {
          alert(err);
        });
      this.article_add_visible = false;
    },
    article_add_cancel() {
      this.article_add_visible = false;
    },
    article_item_more_crud_enter: function() {
      this.article_item_more_crud_element_visible = true;
      this.$refs.article_item_more.style.left =
        event.target.offsetLeft + 250 + "px";
      this.$refs.article_item_more.style.top =
        event.target.offsetParent.offsetTop + 52 + "px";
    },
    Mfloder_mode_show_type_change: function() {
      API.CONFIG.floder_sort_type(this.floder_mode_show_type);
    },
    floder_sort_refresh: function() {
      // console.log(123)
      // debugger;
      // this.floder_list[this.floder_active_index].timemap
      this.floder_list[this.floder_active_index].timemap = new Date().getTime();
      this.floder_active_index = 0;
    },
    floder_delete: function() {
      let self = this;
      API.FLODER.remove(this.floder_active).then(function() {
        self.floder_refresh();
        self.floder_item_more_crud_element_visible = false;
      });
    },
    floder_item_more_crud_enter: function(event, index) {
      this.floder_item_more_crud_element_visible = true;
      this.$refs.floder_item_more.style.left =
        event.target.offsetLeft - 35 + "px";
      this.$refs.floder_item_more.style.top =
        event.target.offsetParent.offsetTop - 29 + "px";

      // console.log(123)
    },
    floder_item_more_crud_out: function(event, index) {
      this.floder_item_more_crud_element_visible = false;
    },
    article_item_more_crud_out: function() {
      this.article_item_more_crud_element_visible = false;
    },
    floder_item_rename: function(index) {
      this.floder_edit_index = index;
    },
    floder_item_active: function(index) {
      let self = this;
      let floder_id = self.floder_list[index].floder_uid;
      this.floder_active_index = index;
      // co(function*(){
      //     let article_list = yield API.ARTICLE.list(self.floder_list[index].floder_uid)
      //     self.article_list = article_list.result
      // })
      // .catch(function(err){

      // })

      this._floder_load(floder_id);

      // this.floder_active = this.floder_list[index].floder_uid
    },
    _floder_load: function(floder_uid, callback) {
      let self = this;
      // if(this.editorQuery=='editor'){
      //   this.$refs.editor.EVA.reset();
      // }
      // if(this.editorQuery=='codemirror'){
      //   this.$refs.codemirror.EVA.reset();
      // }
      co(function*() {

        let article_list = yield API.ARTICLE.list(floder_uid);

        self.article_list = article_list.result;

        // for (var i = self.floder_list.length - 1; i >= 0; i--) {
        //     if(self.floder_list[i].floder_uid === floder_uid){

        //     }
        // }
        self.floder_active = floder_uid;

        callback();
      }).catch(function(err) {});
    },
    floder_edit_cancel(index) {
      this.floder_edit_index = -1;
    },
    floder_edit_ok() {
      this.floder_edit_index = -1;
    },
    floder_add_show: function() {
      this.floder_add_visible = true;
    },
    floder_refresh: function() {
      let self = this;
      API.FLODER.list().then(function(res) {
        self.floder_list = res.result;
      });
    },
    floder_add_ok() {
      let self = this;
      API.FLODER.add(this.floder_add_input)
        .then(function() {
          self.floder_refresh();
          self.floder_add_input = "";
        })
        .catch(function(err) {
          alert(err);
        });
      this.floder_add_visible = false;
    },
    floder_add_cancel() {
      this.floder_add_visible = false;
    }
  },
  computed: {
    // article_markdown_preview_text:function(){
    //     let title = "# " + this.article_title+"\n"
    //     // self.EVA.value = self.editor.getValue()
    //     return marked(title+this.article_content)
    // },
    floder_list_computed: function() {
      // let new_list = Object.assign({},this.floder_list)
      // 直接赋值是引用方式
      // let new_list = this.floder_list
      let new_list = this.floder_list;
      // let new_list = [...array1]
      // console.log(222)
      // 对数组进行排序
      // debugger
      switch (this.floder_mode_show_type) {
        case "1":
          new_list.sort(function(p1, p2) {
            return parseInt(p2._id, 16) - parseInt(p1._id, 16);
          });
          break;
        case "2":
          new_list.sort(function(p1, p2) {
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
          new_list.sort(function(p1, p2) {
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
  created() {
    let currentEditor = this.$route.query.editor;
    if (currentEditor) {
      this.editorQuery = currentEditor;
    }
    let self = this;

    co(function*() {
      let floder_list = yield API.FLODER.list();
      self.floder_list = floder_list.result;

      // 加载内容
      if (self.$route.params.floderid != undefined) {
        // console.log(123)
        self._floder_load(self.$route.params.floderid, function() {
          if (self.$route.params.articleid != undefined) {
            self._acticle_load(self.$route.params.articleid);
          }
        });
      } else {
        self.floder_active = floder_list.result[0].floder_uid;
        let article_list = yield API.ARTICLE.list(
          self.floder_list[0].floder_uid
        );
        self.article_list = article_list.result;
      }
    }).catch(function(err) {
      if (err.STATUSCODE === LOGIN_CODE.LOGIN_NO_LOGIN.STATUSCODE) {
        self.$router.push("login");
      }
    });
  },
  mounted() {
    let self = this;
    // var e = this.$refs.ta1;
    // const saveButton = document.getElementById("saveButton");
    // this.renderEditor()

    // this.editor = CodeMirror.fromTextArea(e, {
    //   mode: "gfm",
    //   theme: "zenburn",
    //   lineWrapping: true,
    //   extraKeys: {
    //     Enter: "newlineAndIndentContinueMarkdownList",
    //     "Ctrl-S": function(cm) {
    //       self.Delay.execute();
    //     },
    //     "Alt-H": function(cm) {
    //       var spaces = cm.getSelection();
    //       cm.replaceSelection("```html\r\n" + spaces + "\r\n```");
    //     },
    //     "Alt-J": function(cm) {
    //       var spaces = cm.getSelection();
    //       cm.replaceSelection("```js\r\n" + spaces + "\r\n```");
    //     },
    //     "Alt-K": function(cm) {
    //       var spaces = cm.getSelection();
    //       cm.replaceSelection("```raw\r\n" + spaces + "\r\n```");
    //     },
    //     "Alt-L": function(cm) {
    //       var spaces = cm.getSelection();
    //       cm.replaceSelection("[" + spaces + "]()");
    //     },
    //     "Alt-`": function(cm) {
    //       var spaces = cm.getSelection();
    //       cm.replaceSelection("`" + spaces + "`");
    //     },
    //     "Alt-1": function(cm) {
    //       let curosr = cm.getCursor();
    //       cm.setCursor(curosr.line, 0);
    //       var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
    //       cm.replaceSelection("#" + spaces);
    //     },
    //     "Alt-2": function(cm) {
    //       let curosr = cm.getCursor();
    //       cm.setCursor(curosr.line, 0);
    //       var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
    //       cm.replaceSelection("##" + spaces);
    //     },
    //     "Alt-3": function(cm) {
    //       let curosr = cm.getCursor();
    //       cm.setCursor(curosr.line, 0);
    //       var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
    //       cm.replaceSelection("###" + spaces);
    //     },
    //     "Alt-I": function(cm) {
    //       let curosr = cm.getCursor();
    //       cm.setCursor(curosr.line, 0);
    //       var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
    //       cm.replaceSelection("* " + spaces);
    //     }
    //   }
    // });

    API.CONFIG.getAll().then(function(res) {
      // console.log(res)
      self.floder_mode_show_type = res.result.floder_sort_type;
    });
  },
  watch: {
    $route: function() {
      console.log("this.$route.query", this.$route.query);
    }
  }
};
</script>
