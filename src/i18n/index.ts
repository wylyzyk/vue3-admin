import { createI18n } from "vue-i18n";
import zhLocale from "./lang/zh";
import enLocale from "./lang/en";
import type { App } from "vue";
import { useAppStore } from "@/stores/app";
import store from "@/stores";

const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
};

// const locale = "zh";
function getLanguage() {
  const appStore = useAppStore(store);
  return appStore && appStore.language;
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  messages,
  locale: getLanguage()
});

export default (app: App<Element>) => {
  app.use(i18n);
};
