<template>
  <router-view />
</template>

<script setup>
  import { useStore } from "vuex";
  import { watchSwitchLanguage } from "./utils/i18n";
  import { generateNewStyle, writeNewStyle } from "./utils/theme";
  const store = useStore();
  generateNewStyle(store.getters.mainColor).then((newStyle) => {
    writeNewStyle(newStyle);
  });

  watchSwitchLanguage(() => {
    if (store.getters.token) {
      store.dispatch("user/getUserInfo");
    }
  });
</script>

<style></style>
