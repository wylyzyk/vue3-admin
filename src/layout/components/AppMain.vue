<script setup>
  import { watch } from "vue";
  import { isTags } from "@/utils/tags.js";
  import { useRoute } from "vue-router";
  import { useStore } from "vuex";
  import { generateTitle, watchSwitchLanguage } from "@/utils/i18n.js";

  const store = useStore();
  const route = useRoute();

  /**
   * 生成title
   */
  const getTitle = (route) => {
    let title = "";
    if (!route.meta) {
      // 处理无meta的路由
      const pathArr = route.path.split("/");
      title = pathArr[pathArr.length - 1];
    } else {
      title = generateTitle(route.meta.title);
    }

    return title;
  };

  watch(
    route,
    (to) => {
      // 只保存需要的参数
      if (!isTags(to)) return;
      const { fullPath, name, meta, params, path, query } = to;
      store.commit("app/addTagsViewList", {
        fullPath,
        name,
        meta,
        params,
        path,
        query,
        title: getTitle(to)
      });
    },
    { immediate: true }
  );

  watchSwitchLanguage(() => {
    store.getters.tagsViewList.forEach((route, index) => {
      store.commit("app/changeTagsView", {
        index,
        tag: { ...route, title: getTitle(route) }
      });
    });
  });
</script>

<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <Transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </Transition>
    </router-view>
    <!-- <router-view></router-view> -->
  </div>
</template>

<style lang="scss" scoped>
  .app-main {
    min-height: calc(100vh - 50px - 43px);
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 104px 20px 20px 20px;
    box-sizing: border-box;
  }
</style>
