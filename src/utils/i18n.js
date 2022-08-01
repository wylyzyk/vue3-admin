import { i18n } from "@/i18n";
import store from "@/store";
import { watch } from "vue";

export function generateTitle(title) {
  return i18n.global.t(`msg.route.${title}`);
}

/**
 * 监听语言变化，同时执行callback
 */
export function watchSwitchLanguage(...callbacks) {
  watch(
    () => store.getters.language,
    () => {
      callbacks.forEach((callback) => callback(store.getters.language));
    }
  );
}
