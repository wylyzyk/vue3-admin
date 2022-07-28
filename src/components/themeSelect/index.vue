<template>
  <!-- v-bind: https://v3.cn.vuejs.org/api/instance-properties.html#attrs -->
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <SvgIcon icon="change-theme" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t("msg.theme.themeColorChange") }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 弹出展示 -->
  <div>
    <SelectColor v-model="selectColorVisible" />
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import SvgIcon from "../SvgIcon/index.vue";
  import SelectColor from "./components/selectColor.vue";

  const selectColorVisible = ref(false);

  const handleSetTheme = () => {
    selectColorVisible.value = true;
  };
</script>

<style lang="scss" scoped></style>
