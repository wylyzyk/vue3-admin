import path from "path";
import { i18n } from "@/i18n";

export const generateRoutes = (routes, basePath = "/", prefixTile = []) => {
  let result = [];
  for (const route of routes) {
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTile]
    };

    // 当前存在meta时，使用i18n解析国际化数据，组成新的title内容
    // 动态路由不允许被搜索
    // 匹配动态路由的正则
    const reg = /.*\/:.*/;
    if (route.meta && route.meta.title && !reg.exec(route.path)) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`);
      data.title = [...data.title, i18nTitle];
      result.push(data);
    }

    // 存在children
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title);
      if (tempRoutes.length >= 1) {
        result = [...result, ...tempRoutes];
        // result.push(...tempRoutes);
      }
    }
  }
  return result;
};
