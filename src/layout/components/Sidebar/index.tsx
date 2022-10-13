import { defineComponent } from "vue";
import { Avatar } from "ant-design-vue";

import { useAppStore } from "@/stores/app";

import styled from "./index.module.scss";
import SidebarMenu from "@/layout/components/Sidebar/SidebarMenu";

const logoHeight = 44;
export default defineComponent({
  name: "Sidebar",
  setup() {
    const appStore = useAppStore();

    return () => (
      <div>
        <div class={styled["logo-container"]}>
          <Avatar
            size={logoHeight}
            shape={"square"}
            src={"https://avatars.githubusercontent.com/u/49738226?v=4"}
          />
          {appStore.sidebarOpened && (
            <h1 class={styled["logo-title"]}>Admin</h1>
          )}
        </div>
        <div>
          <SidebarMenu />
        </div>
      </div>
    );
  }
});
