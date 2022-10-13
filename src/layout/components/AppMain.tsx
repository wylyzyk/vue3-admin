import { generateTitle, watchSwitchLanguage } from "@/utils/i18n";
import { defineComponent, KeepAlive, Transition, watch } from "vue";
import {
  RouterView,
  useRoute,
  type RouteLocationNormalizedLoaded
} from "vue-router";
import { isTags } from "@/utils/tags";
import { useAppStore, type TTag } from "@/stores/app";

import styled from "./appMain.module.scss";

export default defineComponent({
  name: "AppMain",
  setup() {
    /**
     * 生成title
     */
    const getTitle = (route: RouteLocationNormalizedLoaded) => {
      let title: string;
      if (!route.meta) {
        // 处理无meta的路由
        const pathArr = route.path.split("/");
        title = pathArr[pathArr.length - 1];
      } else {
        title = generateTitle(route.meta.title as string);
      }
      return title;
    };

    const appStore = useAppStore();
    const route = useRoute();
    watch(
      route,
      (to) => {
        if (!isTags(to)) return;
        const { fullPath, name, meta, params, path, query } = to;
        appStore.addTagsViewList({
          fullPath,
          name,
          meta,
          params,
          path,
          query,
          title: getTitle(to)
        } as TTag);
      },
      { immediate: true }
    );

    watchSwitchLanguage(() => {
      appStore?.tagsViewList?.forEach((route, index) => {
        appStore.changeTagsView({
          index,
          tag: { ...route, title: getTitle(route) }
        });
      });
    });

    return () => (
      <div class={styled["app-main"]}>
        <RouterView>
          {({ Component, route }: any) => {
            return (
              <Transition name="fade-transform" mode="out-in">
                <KeepAlive>
                  <div>
                    <Component key={route.path} />
                  </div>
                </KeepAlive>
              </Transition>
            );
          }}
        </RouterView>
      </div>
    );
  }
});
