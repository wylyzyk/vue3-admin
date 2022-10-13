import { defineComponent, ref, computed, watch } from "vue";
import SvgIcon from "@/components/SvgIcon";
import { Select, type SelectProps } from "ant-design-vue";
import { useRouter } from "vue-router";

import styled from "./index.module.scss";
import { filterRoutes } from "@/utils/route";
import { generateRoutes } from "@/components/HeaderSearch/fuseData";
import Fuse from "fuse.js";
import { watchSwitchLanguage } from "@/utils/i18n";

const HeaderSearch = defineComponent({
  setup() {
    const router = useRouter();
    // data source
    // const searchPool = ref<ComputedRef<{ path: string; title: string[] }[]>>();
    let searchPool: any;
    searchPool = computed(() => {
      const routes = filterRoutes(router.getRoutes());
      return generateRoutes(routes);
    });

    let fuse: Fuse<unknown> = undefined;
    const initFuse = (searchPool: any) => {
      fuse = new Fuse(searchPool, {
        shouldSort: true,
        minMatchCharLength: 1,
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

    const headerSearchSelectRef = ref<HTMLSelectElement | null>(null);
    const isShow = ref(false);
    const onShowClick = () => {
      isShow.value = !isShow.value;
      // 聚焦
      (headerSearchSelectRef.value as HTMLSelectElement).focus();
    };

    watch(isShow, (value) => {
      if (value) {
        document.body.addEventListener("click", onClose);
      } else {
        document.body.removeEventListener("click", onClose);
      }
    });

    const search = ref("");
    const searchOptions = ref<SelectProps["options"]>([]);
    const onClose = () => {
      headerSearchSelectRef.value.blur();
      isShow.value = false;
      searchOptions.value = [];
    };

    const querySearch = (query: string) => {
      if (query !== "") {
        const arr = [] as SelectProps["options"];
        // 模糊搜索
        const datas = fuse.search(query);
        datas.forEach((data: any) => {
          arr.push({
            label: `${data.item.title.join(">")}`,
            value: data.item.path
          });
        });
        searchOptions.value = arr;
      } else {
        searchOptions.value = [];
      }
    };

    const onSelectChange = (val: any) => {
      router.push(val);
    };

    watchSwitchLanguage(() => {
      searchPool = computed(() => {
        const routes = filterRoutes(router.getRoutes());
        return generateRoutes(routes);
      });
      initFuse(searchPool.value);
    });

    return () => {
      return (
        <div
          class={`${styled["header-search"]} ${isShow.value && styled["show"]}`}
        >
          <span onClick={onShowClick} id={"guide-search"}>
            <SvgIcon
              fillClass={`svg-icon ${styled["search-icon"]}`}
              name={"search"}
            />
          </span>

          <Select
            ref={headerSearchSelectRef}
            class={styled["header-search-select"]}
            v-model:value={search.value}
            defaultActiveFirstOption={false}
            showArrow={false}
            onChange={onSelectChange}
            showSearch
            onSearch={querySearch}
            options={searchOptions.value}
          />
        </div>
      );
    };
  }
});

export default HeaderSearch;
