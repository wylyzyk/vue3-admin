<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- left menu -->
    <Sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <Navbar />
        <TagsView id="guide-tags" />
      </div>
      <!-- content -->
      <AppMain />
    </div>
  </div>
</template>

<script setup>
  import Navbar from "./components/Navbar.vue";
  import Sidebar from "./components/sidebar";
  import AppMain from "./components/AppMain.vue";
  import variables from "@/styles/variables.module.scss";
  import TagsView from "@/components/tagsView/index.vue";

  console.log(variables);
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.module.scss";

  .app-wrapper {
    @include clearfix;
    // overflow: hidden;
    // overflow-y: auto;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});

    transition: width #{$sidebarDuration};
  }
  .hideSidebar .fixed-header {
    width: calc(100% - #{$hideSidebarWidth});
  }
</style>
