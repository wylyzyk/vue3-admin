import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw
} from "vue-router";
import layout from "@/layout";
import articleCreate from "./modules/articleCreate";
import article from "./modules/article";
import permissionList from "./modules/permissionList";
import roleList from "./modules/roleList";
import userManage from "./modules/userManage";
import { useUserStore } from "@/stores/user";
import store from "@/stores";
// import Login from "@/views/login/index";

/**
 * 私有路由表
 * 权限
 */
export const privateRoutes = [
  roleList,
  userManage,
  permissionList,
  article,
  articleCreate
] as RouteRecordRaw[];
/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login")
  },
  {
    path: "/",
    redirect: "/profile",
    component: layout,
    children: [
      {
        // 个人中心
        path: "/profile",
        name: "profile",
        component: () => import("@/views/profile/index"),
        meta: { title: "profile", icon: "me" }
      },
      {
        // 404
        path: "/404",
        name: "404",
        component: () => import("@/views/error-page/404")
      },
      {
        // 401
        path: "/401",
        name: "401",
        component: () => import("@/views/error-page/401")
      }
    ]
  }
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicRoutes
});

export const resetRouter = () => {
  const userStore = useUserStore(store);
  if (
    userStore.userInfo &&
    userStore.userInfo.permission &&
    userStore.userInfo.permission.menus
  ) {
    const menus = userStore.userInfo.permission.menus;
    menus.forEach((menu) => {
      router.removeRoute(menu);
    });
  }
};

export default router;
