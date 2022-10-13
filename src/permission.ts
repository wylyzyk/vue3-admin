import router from "./router";

import { usePermissionStore } from "@/stores/permission";
import { useUserStore } from "@/stores/user";

const permissionStore = usePermissionStore();
const userStore = useUserStore();

const defenderOfPass = ["/login"];

router.beforeEach(async (to, _, next) => {
  // logined
  if (userStore.token) {
    if (to.path === "/login") {
      next("/");
    } else {
      // 判断用户资料是否存在，如果不存在则进行获取
      if (!userStore.hasUserInfo) {
        const { permission } = await userStore.getUserInfo();
        // 处理用户权限,筛选出需要添加的路由
        const filterRoutes = await permissionStore.filterRoutes(
          permission.menus
        );
        // 添加路由
        filterRoutes.forEach((item) => {
          router.addRoute(item);
        });
        // 添加完之后, 需要进行主动跳转
        return next(to.path);
      }
      next();
    }
  } else {
    // unlogin
    if (defenderOfPass.indexOf(to.path) > -1) {
      next();
    } else {
      next("/login");
    }
  }
});
