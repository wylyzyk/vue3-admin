import { createRouter, createWebHashHistory } from "vue-router";
import layout from "@/layout";

const publicRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login")
  },
  {
    path: "/",
    component: layout
    // redirect: "/profile",
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
});

export default router;
