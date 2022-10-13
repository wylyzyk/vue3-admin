import layout from "@/layout";
import type { RouteRecordRaw } from "vue-router";

export default {
  path: "/user",
  component: layout,
  redirect: "/user/manage",
  name: "permissionList",
  meta: {
    title: "user",
    icon: "personnel"
  },
  children: [
    {
      path: "/user/permission",
      component: () => import("@/views/permission-list/index"),
      meta: {
        title: "permissionList",
        icon: "permission"
      }
    }
  ]
} as RouteRecordRaw;
