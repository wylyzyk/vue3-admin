<script setup>
  import { ref } from "vue";
  import ProjectCard from "./components/projectCard.vue";
  import Feature from "./components/feature.vue";
  import Chapter from "./components/chapter.vue";
  import Author from "./components/author.vue";
  import { feature } from "@/api/user";
  import { watchSwitchLanguage } from "@/utils/i18n";

  const activeName = ref("feature");

  const featureData = ref([]);
  const getFeatureData = async () => {
    featureData.value = await feature();
  };
  getFeatureData();

  watchSwitchLanguage(getFeatureData());
</script>

<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <ProjectCard class="project-card" :features="featureData" />
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <Feature :features="featureData" />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <Chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <Author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
  .project-card {
    margin-right: 20px;
  }
</style>
