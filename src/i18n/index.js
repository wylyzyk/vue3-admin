import { createI18n } from "vue-i18n";
import zhLocale from "./lang/zh";
import enLocale from "./lang/en";
import store from "@/store";

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
  return store && store.getters && store.getters.language;
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  messages,
  locale: getLanguage()
});

export default (app) => {
  app.use(i18n);
};
