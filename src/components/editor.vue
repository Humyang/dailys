<template>
  <div class="write_article_wrap">
    <!-- <div
      class="article"
      :class="{md_preview:visible.markdown === 1,
                    full:visible.page_mode === 2}"
    >-->
    <div id="ta1" style="height: 100%;overflow: auto;"></div>
  </div>
  <!-- </div> -->
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import "../css/btn.css";
import "animate.css";
import "../css/custom_animate.css";
import "../css/WriteArticle.css";
import "../../node_modules/highlight.js/styles/pojoaque.css";
import "../../serve/backend/views/css/topic.css";

import { IP } from "../../serve/PREDEFINED/CONSTANT.js";

import * as API from "../../serve/fontend/index.js";
import co from "co";
import Delay from "../../serve/fontend/Obj/Delay.js";
import dndUpload from "../../serve/fontend/Obj/dndUpload/dndUpload.js";

import EVA from "../../serve/fontend/Obj/EditorValueAdvance.js";

import SwitchF from "../../vendors/ytool.switch.js";

var LOGIN_CODE = require("flogin").CODE;
const EditorJS = require("@editorjs/editorjs");
const Header = require("@editorjs/header");
const Marker = require("@editorjs/marker");
const RawTool = require("@editorjs/raw");

const SimpleImage = require("@editorjs/simple-image");
const List = require("@editorjs/list");
const Checklist = require("@editorjs/checklist");
const Quote = require("@editorjs/quote");
const Warning = require("@editorjs/warning");
const CodeTool = require("@editorjs/code");
const Delimiter = require("@editorjs/delimiter");
const InlineCode = require("@editorjs/inline-code");
const LinkTool = require("@editorjs/link");
const Embed = require("@editorjs/embed");
const Table = require("@editorjs/table");

export default {
  props: ["data"],
  data() {
    return {
      //   is_listen_change: false,
      floder_list: [],
      visible: {
        page_mode: 0, //0:normal:treeview editor markdown 1:editor & markdown preview 2 only editor
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
    renderEditor(data) {
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
      // if(this.editor!="sb"){
      //   this.editor.destroy()
      // }
      this.editor = new EditorJS({
        /**
         * Wrapper of Editor
         */
        holderId: "ta1",
        /**
         * Tools list
         */
        tools: {
          /**
           * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
           */
          header: {
            class: Header,
            inlineToolbar: ["link"],
            config: {
              placeholder: "Header"
            },
            shortcut: "CMD+SHIFT+H"
          },
          /**
           * Or pass class directly without any configuration
           */
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
        /**
         * This Tool will be used as default
         */
        // initialBlock: 'paragraph',
        /**
         * Initial Editor data
         */
        data: { blocks: data },
        onReady: function() {},
        onChange: function() {
          console.log("something changed");
          //   if (self.is_listen_change) {
          self.onEditorChange();
          //   }
        }
      });
      window.editor = this.editor;
    },
    saveP() {
      return new Promise((reslove, reject) => {
        this.editor.save().then(savedData => {
          reslove(savedData);
          // cPreview.show(savedData, document.getElementById("output"));
        });
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

  watch: {
    data: {
      handler: function() {
        this.EVA.reset();
        if (typeof this.data != "string") {
          this.EVA.value = "";
        } else {
          this.EVA.value = this.data;
        }
        this.renderEditor(this.data);
      }
    }
  },
  mounted() {
    let self = this;
    // this.renderEditor()
    this.Delay = new Delay(5000, async function() {
      // self.old_text =""
      // let new_text = self.editor.getValue()
      //   self.EVA.value = self.editor.getValue();
      // self.EVA.value =JSON.stringify( self.editor.configuration.data.blocks)

      // let saverData = yield self.editor.save()
      let saverData = await self.saveP();
      // self.editor.configuration.blocks = saverData
      console.log("delay");
      self.EVA.value = JSON.stringify(saverData.blocks);
      // console.log(self.EVA.diff_result)
      //   console.log(123);
      //   self.article_markdown_preview_text = marked(self.EVA.value);
      //   self.article_content_save(
      //     self.EVA.patch_list,
      //     self.article_title,
      //     self.article_active,
      //     self.floder_active
      //   );
      // self.$emit("save",self.EVA.patch_list)

      self.$emit("save", { content: self.EVA.patch_list, editor: "editor" });
    });

    this.onEditorChange = async function() {
      // 为了使 editor off 执行生效，只能将push操作封装起来
      // 因为 on 和 off 是根据 function 来的
      // 如果使用匿名函数 function(){self.Delay.push()}
      // 会无法 off 回失效
      // self.article_content_style.changed = true;
      self.$emit("changed");

      // 为 article_markdown_preview_text 属性提供变量
      let saverData = await self.saveP();
      // self.article_content = JSON.stringify(saverData.blocks);
      // self.article_content = self.editor.getValue()
      // self.EVA.value = self.editor.getValue()
      // console.log(self.EVA.diff_result)
      self.Delay.push();
    };

    this.EVA = new EVA();
  }
};
</script>
