<template>
  <div>
    <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
    <SvgIcon v-else :icon="icon" />
    <span>{{ generateTitle(title) }}</span>
  </div>
</template>

<script setup>
  import { defineProps } from "vue";
  import SvgIcon from "@/components/SvgIcon/index.vue";
  import { generateTitle } from "@/utils/i18n";
  defineProps({
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  });
</script>

<style lang="scss" scoped></style>
