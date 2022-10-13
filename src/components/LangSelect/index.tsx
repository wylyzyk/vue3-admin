import { computed, defineComponent } from "vue";
import { Dropdown, Menu, Tooltip, message } from "ant-design-vue";
import SvgIcon from "@/components/SvgIcon";
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/stores/app";
import type { MenuInfo } from "ant-design-vue/lib/menu/src/interface";

export default defineComponent({
  name: "LangSelect",
  setup() {
    const i18n = useI18n();

    const store = useAppStore();
    const language = computed(() => store.language);
    const handleSetLanguage = (info: MenuInfo) => {
      i18n.locale.value = info.key as string;
      store.setLanguage(info.key as string);
      message.success(i18n.t("msg.toast.switchLangSuccess"));
    };

    return () => {
      return (
        <Dropdown
          trigger={["click"]}
          v-slots={{
            overlay: () => (
              <Menu onClick={(info) => handleSetLanguage(info)}>
                <Menu.Item disabled={language.value === "zh"} key={"zh"}>
                  中文
                </Menu.Item>
                <Menu.Item disabled={language.value === "en"} key="en">
                  English
                </Menu.Item>
              </Menu>
            )
          }}
        >
          <div>
            <Tooltip
              v-slots={{ title: () => i18n.t("msg.navBar.lang") }}
              placement={"bottom"}
            >
              <span id="guide-lang">
                <SvgIcon name="language" />
              </span>
            </Tooltip>
          </div>
        </Dropdown>
      );
    };
  }
});
