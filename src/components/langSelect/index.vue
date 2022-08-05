<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip content="$t('msg.navBar.lang')" :effect="effect">
        <span id="guide-lang">
          <SvgIcon class="language-icon" id="guide-lang" icon="language" />
        </span>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
  import { computed } from "@vue/reactivity";
  import { ElMessage } from "element-plus";
  import { defineProps } from "vue";
  import { useI18n } from "vue-i18n";
  import { useStore } from "vuex";
  import SvgIcon from "../SvgIcon/index.vue";
  defineProps({
    effect: {
      type: String,
      default: "dark",
      validator(value) {
        return ["dark", "light"].indexOf(value) !== -1;
      }
    }
  });

  const store = useStore();
  const language = computed(() => store.getters.language);

  const i18n = useI18n();
  const handleSetLanguage = (lang) => {
    console.log("lang", lang);
    i18n.locale.value = lang;
    store.commit("app/setLanguage", lang);
    ElMessage.success(i18n.t("msg.toast.switchLangSuccess"));
  };
</script>

<style lang="scss" scoped></style>
