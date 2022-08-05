<script setup>
  import SvgIcon from "../SvgIcon/index.vue";
  import Driver from "driver.js";
  import "driver.js/dist/driver.min.css";
  import { onMounted } from "vue";
  import steps from "./steps";
  import { useI18n } from "vue-i18n";

  const i18n = useI18n();

  let driver = null;
  onMounted(() => {
    driver = new Driver({
      // 禁止点击mask关闭
      allowClose: false,
      closeBtnText: i18n.t("msg.guide.close"),
      nextBtnText: i18n.t("msg.guide.next"),
      prevBtnText: i18n.t("msg.guide.prev")
    });
  });

  const onClick = () => {
    console.log("start");
    driver.defineSteps(steps(i18n));
    driver.start();
  };
</script>

<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <span id="guide-start" @click="onClick">
        <SvgIcon icon="guide" />
      </span>
    </el-tooltip>
    <h2 id="test"></h2>
  </div>
</template>

<style lang="scss" scoped></style>
