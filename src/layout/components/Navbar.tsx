import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { Dropdown, Avatar, Menu } from "ant-design-vue";
import { useI18n } from "vue-i18n";

import styled from "./navbar.module.scss";
import { useUserStore } from "@/stores/user";
import LangSelect from "@/components/LangSelect";
import ScreenFull from "@/components/ScreenFull";
import HeaderSearch from "@/components/HeaderSearch";
import Hamburger from "@/components/Hamburger";
import Breadcrumb from "@/components/Breadcrumb";

const Navbar = defineComponent(() => {
  return () => (
    <div class={styled.navbar}>
      <Hamburger class={styled["hamburger-container"]} />
      <Breadcrumb class={styled["breadcrumb-container"]} />
      <div class={styled["right-menu"]}>
        <HeaderSearch class={`${styled["right-menu-item"]} hover-effect`} />
        <ScreenFull class={`${styled["right-menu-item"]} hover-effect`} />
        <LangSelect class={`${styled["right-menu-item"]} hover-effect`} />
        <Dropdown
          class={styled["avatar-container"]}
          trigger={"click"}
          v-slots={{
            overlay: () => <CustomDropDown />
          }}
        >
          <div class={styled["avatar-wrapper"]}>
            <Avatar
              class={styled["avatar"]}
              shape={"square"}
              size={40}
              src={"https://avatars.githubusercontent.com/u/49738226?v=4"}
            />
          </div>
        </Dropdown>
      </div>
    </div>
  );
});

const CustomDropDown = defineComponent({
  name: "CustomDropDown",
  setup() {
    const i18n = useI18n();

    const userStore = useUserStore();
    const logout = () => {
      userStore.logout();
    };

    return () => {
      return (
        <Menu>
          <RouterLink to={"/"}>
            <Menu.Item>{i18n.t("msg.navBar.home")}</Menu.Item>
          </RouterLink>
          <RouterLink to={"/"}>
            <Menu.Divider />
            <Menu.Item onClick={logout}>{i18n.t("msg.navBar.logout")}</Menu.Item>
          </RouterLink>
        </Menu>
      );
    };
  }
});

export default Navbar;
