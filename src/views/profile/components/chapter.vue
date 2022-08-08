<script setup>
  import { chapter } from "@/api/user";
  import { watchSwitchLanguage } from "@/utils/i18n";
  import { ref } from "vue";

  const chapterData = ref([]);
  const getChapterData = async () => {
    chapterData.value = await chapter();
  };
  getChapterData();
  watchSwitchLanguage(getChapterData());
</script>

<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in chapterData"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        <h4>{{ item.content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<style lang="scss" scoped></style>
