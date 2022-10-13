import { defineComponent, type PropType } from "vue";
import { type RouteRecordRaw, RouterLink } from "vue-router";
import { MenuItem as AMenuItem, Menu } from "ant-design-vue";
import SidebarItem from "@/layout/components/Sidebar/SidebarItem";
import MenuItem from "@/layout/components/Sidebar/MenuItem";

export default defineComponent({
  name: "SidebarItem",
  props: {
    route: { type: Object as PropType<RouteRecordRaw>, required: true }
  },
  setup(props) {
    return () => {
      const { route } = props;
      return (
        <div>
          {route.children!.length > 0 ? (
            <Menu.SubMenu
              key={route.path}
              v-slots={{
                title: () => (
                  <MenuItem
                    title={route.meta?.title as string}
                    icon={route.meta?.icon as string}
                  />
                )
              }}
            >
              {route.children?.map((item: RouteRecordRaw) => (
                <RouterLink to={item.path}>
                  <SidebarItem key={item.path} route={item} />
                </RouterLink>
              ))}
            </Menu.SubMenu>
          ) : (
            <AMenuItem key={route.path}>
              <MenuItem
                title={route.meta?.title as string}
                icon={route.meta?.icon as string}
              />
            </AMenuItem>
          )}
        </div>
      );
    };
  }
});
