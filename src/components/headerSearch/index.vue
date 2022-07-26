<template>
  <div class="header-search" :class="{ show: isShow }">
    <span @click.stop="onShowClick" id="guide-search">
      <SvgIcon class="svg-icon search-icon" icon="search" />
    </span>
    <!-- <Search @click.stop="onShowClick" /> -->
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join('>')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
  import Fuse from "fuse.js";
  import { ref, computed, watch } from "vue";
  import { filterRoutes } from "@/utils/route";
  import { useRouter } from "vue-router";
  import { generateRoutes } from "./fuseData";
  import { watchSwitchLanguage } from "@/utils/i18n";
  import SvgIcon from "../SvgIcon/index.vue";

  // 数据源
  const router = useRouter();
  // const searchPool = ref([]);
  let searchPool = computed(() => {
    const routes = filterRoutes(router.getRoutes());
    return generateRoutes(routes);
  });

  // 搜索库相关
  let fuse = undefined;
  const initFuse = (searchPool) => {
    fuse = new Fuse(searchPool, {
      // 首付按优先级进行排序
      shouldSort: true,
      // 匹配长度超过这个值的才会被人为是匹配的
      minMatchCharLength: 1,
      // 将被搜索的键列表。这支持嵌套路径、加权搜索、在字符串和对象数组中搜索
      // name: 搜索的键
      // weight: 对应的权重
      keys: [
        {
          name: "title",
          weight: 0.7
        },
        {
          name: "path",
          weight: 0.3
        }
      ]
    });
  };
  initFuse(searchPool.value);

  const headerSearchSelectRef = ref(null);
  // 控制search的展示
  const isShow = ref(false);
  const onShowClick = () => {
    isShow.value = !isShow.value;
    headerSearchSelectRef.value.focus();
  };

  watch(isShow, (value) => {
    if (value) {
      // 打开
      document.body.addEventListener("click", onClose);
    } else {
      // 关闭
      document.body.removeEventListener("click", onClose);
    }
  });

  /**
   * 关闭search的处理事件
   */
  const onClose = () => {
    headerSearchSelectRef.value.blur();
    isShow.value = false;
    searchOptions.value = [];
  };

  const search = ref("");
  const searchOptions = ref([]);
  const querySearch = (query) => {
    if (query !== "") {
      searchOptions.value = fuse.search(query);
    } else {
      searchOptions.value = [];
    }
  };

  const onSelectChange = (value) => {
    router.push(value.path);
  };

  watchSwitchLanguage(() => {
    searchPool = computed(() => {
      const routes = filterRoutes(router.getRoutes());
      return generateRoutes(routes);
    });
    initFuse(searchPool.value);
  });
</script>

<style lang="scss" scoped>
  .header-search {
    // font-size: 0 !important;
    .search-icon {
      cursor: pointer;
      font-size: 25px;
      vertical-align: middle;
    }
    .header-search-select {
      font-size: 18px;
      transition: width 0.2s;
      width: 0;
      overflow: hidden;
      background: transparent;
      border-radius: 0;
      display: inline-block;
      vertical-align: middle;

      ::v-deep .el-input__inner {
        border-radius: 0;
        border: 0;
        padding-left: 0;
        padding-right: 0;
        box-shadow: none !important;
        border-bottom: 1px solid #d9d9d9;
        vertical-align: middle;
      }
    }
    &.show {
      .header-search-select {
        width: 210px;
        margin-left: 10px;
      }
    }
  }
</style>
