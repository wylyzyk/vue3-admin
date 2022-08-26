<script setup>
  import { onMounted, defineProps, defineEmits, watch } from "vue";
  import MKEditor from "@toast-ui/editor";
  import "@toast-ui/editor/dist/toastui-editor.css";
  import "@toast-ui/editor/dist/i18n/zh-cn";
  import { useStore } from "vuex";
  import { watchSwitchLanguage } from "@/utils/i18n";
  import { commitArticle, editArticle } from "./commit";

  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    detail: {
      type: Object,
      default: () => ({})
    }
  });

  const emits = defineEmits(["onSuccess"]);

  watch(
    () => props.detail,
    (val) => {
      if (val && val.content) {
        editor.setHTML(val.content);
      }
    },
    { immediate: true }
  );

  let editor = null;
  let el = null;

  onMounted(() => {
    el = document.querySelector("#markdown-box");
    initialEditor();
  });
  watchSwitchLanguage(() => {
    if (!el) return;
    const htmlValue = editor.getHTML();
    editor.destroy();
    initialEditor();
    editor.setHTML(htmlValue);
  });

  const store = useStore();
  const initialEditor = () => {
    editor = new MKEditor({
      el,
      height: "500px",
      initialEditType: "markdown",
      previewStyle: "vertical",
      language: store.getters.language === "zh" ? "zh-CN" : "en"
    });
    editor.getMarkdown();
  };

  const onSubmitClick = async () => {
    if (props.detail && props.detail._id) {
      console.log("edit");
      // 编辑文章
      await editArticle({
        id: props.detail._id,
        title: props.title,
        content: editor.getHTML()
      });
    } else {
      console.log("commit");
      await commitArticle({
        title: props.title,
        content: editor.getHTML()
      });
    }
    editor.reset();
    emits("onSuccess");
  };
</script>

<template>
  <div class="markdown-container">
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">
        {{ $t("msg.article.commit") }}
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .markdown-container {
    .bottom {
      margin-top: 20px;
      text-align: right;
    }
  }
</style>
