import { i18n } from "@/i18n";
import type { RuleObject } from "ant-design-vue/lib/form";

export function validatePassword() {
  return (rule?: RuleObject, value?: any, callback?: any) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t("msg.login.passwordRule")));
    } else {
      callback();
    }
  };
}
