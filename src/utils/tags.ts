import type { RouteLocationNormalizedLoaded } from "vue-router";
const whiteList = ["/login", "/404", "/401"];

export function isTags(path: string | RouteLocationNormalizedLoaded) {
  return !whiteList.includes(path as string);
}
