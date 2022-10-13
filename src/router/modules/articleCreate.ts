import layout from "@/layout";
import type { RouteRecordRaw } from "vue-router";

export default {
  path: "/article",
  component: layout,
  redirect: "/article/ranking",
  name: "articleCreate",
  meta: { title: "article", icon: "article" },
  children: [
    {
      path: "/article/create",
      component: () => import("@/views/article-create"),
      meta: {
        title: "articleCreate",
        icon: "article-create"
      }
    },
    {
      path: "/article/editor/:id",
      component: () => import("@/views/article-create"),
      meta: {
        title: "articleEditor"
      }
    }
  ]
} as RouteRecordRaw;
