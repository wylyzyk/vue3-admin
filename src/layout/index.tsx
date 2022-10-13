import { defineComponent } from "vue";

import styled from "./index.module.scss";
import { useAppStore } from "@/stores/app";
import Sidebar from "@/layout/components/Sidebar";
import { useThemeStore } from "@/stores/theme";
import Navbar from "@/layout/components/Navbar";
import AppMain from "@/layout/components/AppMain";

export default defineComponent({
  name: "Layout",
  setup() {
    const appStore = useAppStore();
    const themeStore = useThemeStore();
    return () => (
      <div
        class={`${styled["appWrapper"]} ${
          appStore.sidebarOpened ? "openSidebar" : "hideSidebar"
        }`}
      >
        {/*left menu*/}
        <Sidebar
          class={"sidebar-container"}
          style={{ backgroundColor: themeStore.variables?.menuBg }}
        />
        <div class={"main-container"}>
          <div class={"fixed-header"}>
            <Navbar />
          </div>
          {/*content*/}
          <AppMain />
        </div>
      </div>
    );
  }
});
