<script setup>
  import { ref } from "vue";
  import Markdown from "./components/markdown.vue";
  import Editor from "./components/editor.vue";
  import { useRoute } from "vue-router";
  import { articleDetail } from "@/api/article";

  const title = ref("");
  const activeName = ref("markdown");

  const route = useRoute();
  const articleId = route.params.id;
  const detail = ref({});
  const getArticleDetail = async () => {
    detail.value = await articleDetail(articleId);
    title.value = detail.value.title;
  };

  if (articleId) {
    getArticleDetail();
  }

  const onSuccess = () => {
    title.value = "";
  };
</script>

<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxLength="20"
        clearable
      ></el-input>

      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <Markdown :title="title" @onSuccess="onSuccess" :detail="detail" />
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <Editor />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
  .title-input {
    margin-bottom: 20px;
  }
</style>
