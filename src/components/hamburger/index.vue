<template>
  <div class="hamburger-container" @click="toggleClick">
    <span id="guide-hamburger">
      <SvgIcon class="hamburger" :icon="icon" />
    </span>
  </div>
</template>

<script setup>
  import SvgIcon from "../SvgIcon/index.vue";
  import { useStore } from "vuex";
  import { computed } from "@vue/reactivity";
  const store = useStore();

  const toggleClick = () => {
    store.commit("app/triggerSidebarOpened");
  };

  const icon = computed(() => {
    return store.getters.sidebarOpened
      ? "hamburger-opened"
      : "hamburger-closed";
  });
</script>

<style lang="scss" scoped>
  .hamburger-container {
    padding: 4px 16px;
    .hamburger {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
    }
  }
</style>
