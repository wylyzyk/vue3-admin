<template>
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
    :uniqueOpened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
  >
    <SidebarItem v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>

<script setup>
  import { computed } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { filterRoutes, generateMenus } from "@/utils/route";
  import SidebarItem from "./SidebarItem.vue";

  const router = useRouter();
  const routes = computed(() => {
    const filterRouteList = filterRoutes(router.getRoutes());
    return generateMenus(filterRouteList);
  });

  const route = useRoute();
  const activeMenu = computed(() => {
    const { path } = route;
    return path;
  });
</script>
