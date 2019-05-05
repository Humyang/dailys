<template>
  <div class="write_article_wrap">
    <!-- <div
      class="article"
      :class="{md_preview:visible.markdown === 1,
                    full:visible.page_mode === 2}"
    >-->
    <textarea ref="ta1" name="" id="ta1" cols="30" rows="10"></textarea>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import "../css/btn.css";
import "animate.css";
import "../css/custom_animate.css";
import "../css/WriteArticle.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/zenburn.css";
import "../css/CodeMirror_Theme.css";

// ../node_modules/highlight.js/styles/pojoaque.css
import "../../node_modules/highlight.js/styles/pojoaque.css";
import "../../serve/backend/views/css/topic.css";

import { IP } from "../../serve/PREDEFINED/CONSTANT.js";
var marked = require("marked");
var renderer = new marked.Renderer();
var radCode = renderer.code;
renderer.code = function(code, lang, escaped) {
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
  highlight: function(code, type, sss) {
    return require("highlight.js").highlightAuto(code).value;
  },
  renderer: renderer
});

import * as API from "../../serve/fontend/index.js";
import co from "co";
import CodeMirror from "codemirror";
import "codemirror/mode/gfm/gfm.js";
import Delay from "../../serve/fontend/Obj/Delay.js";
import dndUpload from "../../serve/fontend/Obj/dndUpload/dndUpload.js";
// import DMP from '../../serve/fontend/Obj/Text_Diff_Patch.js'
// import TDP from '../../serve/fontend/Obj/Text_Diff_Patch.js'

import EVA from "../../serve/fontend/Obj/EditorValueAdvance.js";

import SwitchF from "../../vendors/ytool.switch.js";

var LOGIN_CODE = require("flogin").CODE;

export default {
  props: ["data"],
  data() {
    return {
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
      editor: "",
      Delay: "",
      onEditorChange: "",
      EVA: "",
      article_markdown_preview_text: ""
    };
  },
  methods: {
    //   发布文章

    article_content_save: function(value, title, article_active, floder_uid) {
      let self = this;

      co(function*() {
        self.article_content_style.saving = true;

        let update = yield API.ARTICLE.update(
          value,
          title,
          article_active,
          floder_uid
        );

        self.article_content_style.saving = false;
        self.article_content_style.changed = false;

        self.floder_sort_refresh();

        self.article_list_refresh();
      }).catch(function(err) {
        alert(err.MSG);
      });
    },

    floder_sort_refresh: function() {
      // console.log(123)
      // debugger;
      // this.floder_list[this.floder_active_index].timemap
      this.floder_list[this.floder_active_index].timemap = new Date().getTime();
      this.floder_active_index = 0;
    }
  },
  computed: {},
  watch: {
    data: {
      handler: function() {
        let self = this;
        console.log("watch")
        if (self.editor) {
          self.editor.off("change", this.onEditorChange);
        }
        self.EVA.reset();
        self.EVA.value = self.data||"";
        // setTimeout(() => {
          if (self.editor) {
              console.log("self.editor",self.editor)
            
            
            self.editor.setValue(self.EVA.value);
            self.editor.on("change", self.onEditorChange);
          }
        // }, 100);
        // this.renderEditor(this.data);
      }
    }
  },
  mounted() {
    let self = this;
    var e = this.$refs.ta1;

    this.editor = CodeMirror.fromTextArea(e, {
      mode: "gfm",
      theme: "zenburn",
      lineWrapping: true,
      extraKeys: {
        Enter: "newlineAndIndentContinueMarkdownList",
        "Ctrl-S": function(cm) {
          self.Delay.execute();
        },
        "Alt-H": function(cm) {
          var spaces = cm.getSelection();
          cm.replaceSelection("```html\r\n" + spaces + "\r\n```");
        },
        "Alt-J": function(cm) {
          var spaces = cm.getSelection();
          cm.replaceSelection("```js\r\n" + spaces + "\r\n```");
        },
        "Alt-K": function(cm) {
          var spaces = cm.getSelection();
          cm.replaceSelection("```raw\r\n" + spaces + "\r\n```");
        },
        "Alt-L": function(cm) {
          var spaces = cm.getSelection();
          cm.replaceSelection("[" + spaces + "]()");
        },
        "Alt-`": function(cm) {
          var spaces = cm.getSelection();
          cm.replaceSelection("`" + spaces + "`");
        },
        "Alt-1": function(cm) {
          let curosr = cm.getCursor();
          cm.setCursor(curosr.line, 0);
          var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection("#" + spaces);
        },
        "Alt-2": function(cm) {
          let curosr = cm.getCursor();
          cm.setCursor(curosr.line, 0);
          var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection("##" + spaces);
        },
        "Alt-3": function(cm) {
          let curosr = cm.getCursor();
          cm.setCursor(curosr.line, 0);
          var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection("###" + spaces);
        },
        "Alt-I": function(cm) {
          let curosr = cm.getCursor();
          cm.setCursor(curosr.line, 0);
          var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection("* " + spaces);
        }
      }
    });
    // this.Delay = new Delay(5000, function() {
    //   // self.old_text =""
    //   // let new_text = self.editor.getValue()
    //   self.EVA.value = self.editor.getValue();
    //   // console.log(self.EVA.diff_result)
    //   console.log(123);
    //   self.article_markdown_preview_text = marked(self.EVA.value);
    //   self.article_content_save(
    //     self.EVA.patch_list,
    //     self.article_title,
    //     self.article_active,
    //     self.floder_active
    //   );
    // });

    this.Delay = new Delay(5000, async function() {
      // self.old_text =""
      // let new_text = self.editor.getValue()
      //   self.EVA.value = self.editor.getValue();
      // self.EVA.value =JSON.stringify( self.editor.configuration.data.blocks)

      // let saverData = yield self.editor.save()
      self.EVA.value = self.editor.getValue();
      // self.editor.configuration.blocks = saverData
      // self.EVA.value = saverData
      // console.log('saverData',saverData)
    //   self.article_markdown_preview_text = marked(self.EVA.value);
      // console.log(self.EVA.diff_result)
      //   console.log(123);
      //   self.article_markdown_preview_text = marked(self.EVA.value);
    //   self.article_content_save(
    //     self.EVA.patch_list,
    //     self.article_title,
    //     self.article_active,
    //     self.floder_active
    //   );
        self.$emit("save",{content:self.EVA.patch_list,editor:"codemirror"})
    });

    this.onEditorChange = function() {
      // 为了使 editor off 执行生效，只能将push操作封装起来
      // 因为 on 和 off 是根据 function 来的
      // 如果使用匿名函数 function(){self.Delay.push()}
      // 会无法 off 回失效

      // self.article_content_style.changed = true;
       self.$emit('changed')

      // 为 article_markdown_preview_text 属性提供变量
      // self.article_content = self.editor.getValue();
      // self.article_content = self.editor.getValue()
      // self.EVA.value = self.editor.getValue()
      // console.log(self.EVA.diff_result)
      self.Delay.push();
    };

    this.EVA = new EVA();

    var code_mirror = document.getElementsByClassName("CodeMirror")[0];
    code_mirror.style.height = window.innerHeight+ "px";
    window.onresize = function() {
      code_mirror.style.height = window.innerHeight + "px";
    };
    var dnd_upload = new dndUpload(
      document.getElementsByClassName("article")[0],
      {
        // serve_url:'http://localhost:8202/upload',
        onSuccess: function(res) {
          let current_line = self.editor.getCursor().line;
          let img = "![](" + res.img_url.replace("IPADDRESS", IP) + ")";
          self.editor.replaceRange("\r\n\r\n" + img + "\r\n\r\n", {
            line: current_line,
            ch: 0
          });
        }
      }
    );

    // this.floder_add_show_switch = SwitchF([function(){
    //     self.floder_add_show_flag = true
    // },
    // function(){
    //     self.floder_add_show_flag = false
    // }]
    // )
  }
};
</script>
