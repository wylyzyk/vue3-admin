import { privateRoutes, publicRoutes } from "@/router";

export default {
  namespaced: true,
  state: () => ({
    // 路由表,初始拥有静态路由权限
    routes: publicRoutes
  }),
  mutations: {
    /**
     * 增加luyou
     */
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes];
    }
  },
  actions: {
    /**
     * 根据权限筛选路由
     */
    filterRoutes(context, menus) {
      const routes = [];
      // 路由权限匹配
      menus.forEach((key) => {
        // 权限名与路由的name匹配
        routes.push(...privateRoutes.filter((item) => item.name === key));
      });
      // 最后添加不匹配路由进入404
      routes.push({ path: "/:catchAll(.*)", redirect: "/404" });
      context.commit("setRoutes", routes);
      return routes;
    }
  }
};
