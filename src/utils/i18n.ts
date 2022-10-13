import { i18n } from "@/i18n";
import { useAppStore } from "@/stores/app";
import { watch } from "vue";
import store from "@/stores";

const appStore = useAppStore(store);

export function generateTitle(title: string) {
  return i18n.global.t(`msg.route.${title}`);
}

/**
 * 监听语言变化，同时执行callback
 */
export function watchSwitchLanguage(...callbacks: any) {
  watch(
    () => appStore.language,
    () => {
      console.log("change");
      callbacks.forEach((callback: any) => callback(appStore.language));
    }
  );
}
