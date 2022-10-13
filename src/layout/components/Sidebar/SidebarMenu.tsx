import { Menu } from "ant-design-vue";
import { defineComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import SidebarItem from "./SidebarItem";
import { useAppStore } from "@/stores/app";
import { filterRoutes, generateMenus } from "@/utils/route";

export default defineComponent({
  name: "SidebarMenu",
  setup() {
    const appStore = useAppStore();
    const router = useRouter();
    const routes = computed(() => {
      const filterRouteList = filterRoutes(router.getRoutes());
      return generateMenus(filterRouteList);
    });

    const route = useRoute();
    const activeMenu = computed(() => {
      const { path } = route;
      return path;
    });

    // const activeMenu = ref([]);
    // const changeSelectKeys = (item: any) => {
    //   console.log(item);
    //   activeMenu.value = item.keyPath;
    //   router.push(activeMenu.value as RouteLocationRaw);
    // };

    return () => (
      // <>
      <Menu
        mode={"inline"}
        selectedKeys={[activeMenu.value]}
        inlineCollapsed={!appStore.sidebarOpened}
        theme={"dark"}
      >
        {routes.value.map((route) => {
          return <SidebarItem key={route.path} route={route} />;
        })}
      </Menu>
      // </>
    );
  }
});
