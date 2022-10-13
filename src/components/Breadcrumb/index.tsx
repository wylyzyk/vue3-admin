import { defineComponent, ref, watch, TransitionGroup } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Breadcrumb } from "ant-design-vue";

import styled from "./index.module.scss";
import { generateTitle } from "@/utils/i18n";

export default defineComponent(() => {
  const breadcrumbData = ref([]);
  const route = useRoute();
  const getBreadcrumbData = () => {
    breadcrumbData.value = route.matched?.filter((item) => {
      return item.meta && item.meta.title;
    });
  };

  watch(
    route,
    () => {
      getBreadcrumbData();
    },
    { immediate: true }
  );

  const router = useRouter();
  const onLinkClick = (item: any) => {
    router.push(item.path);
  };

  return () => (
    <Breadcrumb class={styled["breadcrumb"]} separator={"/"}>
      {breadcrumbData.value?.map((item, index) => {
        return (
          <Breadcrumb.Item key={item.path}>
            <TransitionGroup name={"breadcrumb"}>
              {index === breadcrumbData.value.length - 1 ? (
                <span class={styled["no-redirect"]} key={item.path}>
                  {generateTitle(item.meta.title)}
                </span>
              ) : (
                <span
                  class={styled["redirect"]}
                  key={item.path}
                  onClick={() => onLinkClick(item)}
                >
                  {generateTitle(item.meta.title)}
                </span>
              )}
            </TransitionGroup>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
});
