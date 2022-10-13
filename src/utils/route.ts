import path from "path-browserify";
import type {
  RouteRecord,
  RouteRecordRaw,
  RouteRecordNormalized
} from "vue-router";

const getChildrenRoutes = (routes: RouteRecord[]) => {
  const result: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children);
    }
  });
  return result;
};

function isNull(data: any) {
  if (!data) return true;
  if (JSON.stringify(data) === "{}") return true;
  if (JSON.stringify(data) === "[]") return true;
}

/**
 * 处理脱离层级的路由(重复的)
 */
export const filterRoutes = (routes: RouteRecord[]) => {
  const childrenRoutes = getChildrenRoutes(routes);
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path;
    });
  });
};

/**
 * 根据routes数据，返回对应的menu的规则数据
 */
export const generateMenus = (
  routes: RouteRecordNormalized[],
  basePath = ""
) => {
  const result: RouteRecordRaw[] = [];
  routes.forEach((item) => {
    if (isNull(item.children) && isNull(item.meta)) return;
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children as RouteRecordNormalized[]));
      return;
    }
    const routePath = path.resolve(basePath, item.path);
    let route = result.find((item) => item.path === routePath);
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      };
      if (route.meta?.icon && route.meta.title) {
        result.push(route);
      }
    }
    if (!isNull(item.children)) {
      route.children?.push(
        ...generateMenus(item.children as RouteRecordNormalized[], routePath)
      );
    }
  });
  return result;
};
