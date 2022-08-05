<template>
  <div @click="onToggle" id="guide-full">
    <SvgIcon
      class="svg-icon"
      :icon="isFullscreen ? 'exit-fullscreen' : 'full-screen'"
    />
  </div>
</template>

<script setup>
  import { onMounted, onUnmounted, ref } from "vue";
  import screenfull from "screenfull";
  import SvgIcon from "../SvgIcon/index.vue";
  // 是否全屏
  const isFullscreen = ref(false);

  // 监听变化
  const change = () => {
    isFullscreen.value = screenfull.isFullscreen;
  };

  // 切换事件
  const onToggle = () => {
    screenfull.toggle();
  };

  // 设置侦听器
  onMounted(() => {
    screenfull.on("change", change);
  });

  // 删除侦听器
  onUnmounted(() => {
    screenfull.off("change", change);
  });
</script>

<style lang="scss" scoped></style>
