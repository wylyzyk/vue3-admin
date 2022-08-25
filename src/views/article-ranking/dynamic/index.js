import { watchSwitchLanguage } from "@/utils/i18n";
import { ref, watch } from "vue";
import DynamicData from "./dynamicData";

// 暴露动态的列数据
export const dynamicData = ref(DynamicData());

watchSwitchLanguage(() => {
  dynamicData.value = DynamicData();
  initSelectDynamicLabel();
});

// 创建被勾选的动态列数据
export const selectDaynamicLabel = ref([]);
// 默认全部勾选
const initSelectDynamicLabel = () => {
  selectDaynamicLabel.value = dynamicData.value.map((item) => item.label);
};
initSelectDynamicLabel();

// table列数据
export const tableColumns = ref([]);
watch(
  selectDaynamicLabel,
  (val) => {
    tableColumns.value = [];
    const selectData = dynamicData.value.filter((item) => {
      return val.includes(item.label);
    });
    tableColumns.value.push(...selectData);
  },
  { immediate: true }
);
