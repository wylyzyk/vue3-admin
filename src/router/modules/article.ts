import layout from "@/layout";
import type { RouteRecordRaw } from "vue-router";

export default {
  path: "/article",
  component: layout,
  redirect: "/article/ranking",
  name: "articleRanking",
  meta: { title: "article", icon: "article" },
  children: [
    {
      path: "/article/ranking",
      component: () => import("@/views/article-ranking"),
      meta: {
        title: "articleRanking",
        icon: "article-ranking"
      }
    },
    {
      path: "/article/:id",
      component: () => import("@/views/article-detail"),
      meta: {
        title: "articleDetail"
      }
    }
  ]
} as RouteRecordRaw;
