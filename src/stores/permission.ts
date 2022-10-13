import { defineStore } from "pinia";
import { privateRoutes, publicRoutes } from "@/router";

export const usePermissionStore = defineStore("permissionStore", {
  state: () => {
    return {
      routes: publicRoutes
    };
  },
  actions: {
    filterRoutes(menus: string[]) {
      return new Promise<{ path: string; redirect: string }[]>(
        (resolve, reject) => {
          const routes = [];
          menus.forEach((key) => {
            routes.push(...privateRoutes.filter((item) => item.name === key));
          });
          routes.push({ path: "/:catchAll(.*)", redirect: "/404" });
          this.routes = [...publicRoutes, ...routes];
          resolve(routes);
          // return routes;
        }
      );
    }
  }
});
