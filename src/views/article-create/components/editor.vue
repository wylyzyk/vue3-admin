<script setup>
  import { onMounted, defineProps, defineEmits, watch } from "vue";
  import {
    createEditor,
    createToolbar,
    i18nChangeLanguage
  } from "@wangeditor/editor";
  import "@wangeditor/editor/dist/css/style.css";
  import { useStore } from "vuex";
  import { watchSwitchLanguage } from "@/utils/i18n";
  import { editArticle, commitArticle } from "./commit";

  const props = defineProps({
    title: {
      required: true,
      type: String
    },
    detail: {
      type: Object,
      default: () => ({})
    }
  });

  const emits = defineEmits(["onSuccess"]);

  let editor = null;
  let contentEl = null;
  let toolbarEl = null;

  onMounted(() => {
    contentEl = document.querySelector("#editor-box");
    toolbarEl = document.querySelector("#toolbar-container");
    initialEditor();
  });

  watchSwitchLanguage(() => {
    if (contentEl && toolbarEl) {
      const htmlValue = editor.getHtml();
      editor.destroy();
      initialEditor();
      editor.setHtml(htmlValue);
    }
  });

  const store = useStore();
  const initialEditor = () => {
    const lang = store.getters.language === "zh" ? "zh-CN" : "en";
    i18nChangeLanguage(lang);
    editor = createEditor({
      selector: contentEl,
      config: {
        placeholder:
          store.getters.language === "zh" ? "请输入内容" : "please input text",
        mode: "default"
      }
    });
    createToolbar({
      editor,
      selector: toolbarEl,
      mode: "default"
    });
  };

  watch(
    () => props.detail,
    (val) => {
      if (val && val.content) {
        console.log(val.content);
        editor.setHtml(val.content);
      }
    },
    {
      immediate: true
    }
  );

  const onSubmitClick = async () => {
    if (props.detail && props.detail._id) {
      // 编辑文章
      await editArticle({
        id: props.detail._id,
        title: props.title,
        content: editor.getHtml()
      });
    } else {
      // 创建文章
      await commitArticle({
        title: props.title,
        content: editor.getHtml()
      });
    }

    editor.setHtml("");
    emits("onSuccess");
  };
</script>

<template>
  <div class="editor-container">
    <div id="editor-wrap">
      <div id="toolbar-container"><!-- 工具栏 --></div>
      <div id="editor-box"><!-- 编辑器 --></div>
    </div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">
        {{ $t("msg.article.commit") }}
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .editor-container {
    .bottom {
      margin-top: 20px;
      text-align: right;
    }
    #editor-box {
      height: 400px;
    }
  }
</style>
