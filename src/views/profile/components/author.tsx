import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import PanThumb from "@/components/PanThumb";

import styled from "./styles/autor.module.scss";

export default defineComponent(() => {
  const i18n = useI18n();

  return () => (
    <div class={styled["author-container"]}>
      <div class={styled["header"]}>
        <PanThumb image={"https://avatars.githubusercontent.com/u/49738226?v=4"} width={"60px"} height={"60px"}>
          {i18n.t("msg.profile.name")}
        </PanThumb>
        <div class={styled["header-desc"]}>
          <h3>{i18n.t("msg.profile.name")}</h3>
          <span>{i18n.t("msg.profile.job")}</span>
        </div>
      </div>
      <div class={styled["info"]}>{i18n.t("msg.profile.Introduction")}</div>
    </div>
  );
});
