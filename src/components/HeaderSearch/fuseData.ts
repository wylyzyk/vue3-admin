import path from "path-browserify";
import { i18n } from "@/i18n";
import { type RouteRecordNormalized } from "vue-router";

export const generateRoutes = (
  routes: RouteRecordNormalized[],
  basePath = "/",
  prefixTitle: string[] = []
) => {
  let result = [] as { path: string; title: string[] }[];
  for (const route of routes) {
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    };

    const reg = /.*\/:.*/;
    if (route.meta && route.meta.title && !reg.exec(route.path)) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`);
      data.title = [...data.title, i18nTitle];
      result.push(data);
    }

    if (route.children) {
      const tempRoutes = generateRoutes(
        route.children as RouteRecordNormalized[],
        data.path,
        data.title
      );
      if (tempRoutes.length >= 1) {
        result = [...result, ...tempRoutes];
      }
    }
  }
  return result;
};
