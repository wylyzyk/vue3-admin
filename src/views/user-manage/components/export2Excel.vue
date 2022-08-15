<script setup>
  import { watchSwitchLanguage } from "@/utils/i18n";
  import { defineProps, defineEmits, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { getUserManageAllList } from "@/api/user-manage";
  import { USER_RELATIONS } from "@/views/import/utils";
  import { dateFilter } from "@/filter";

  defineProps({
    modelValue: {
      type: Boolean,
      required: true
    }
  });

  const emits = defineEmits(["update:modelValue"]);

  const i18n = useI18n();
  let exportDefaultName = i18n.t("msg.excel.defaultName");
  const excelName = ref("");
  excelName.value = exportDefaultName;
  watchSwitchLanguage(() => {
    exportDefaultName = i18n.t("msg.excel.defaultName");
    excelName.value = exportDefaultName;
  });

  const loading = ref(false);
  const onConfirm = async () => {
    loading.value = true;
    const { list } = await getUserManageAllList();
    // 导入工具包
    const excel = await import("@/utils/Export2Excel");
    const data = formatJson(USER_RELATIONS, list);
    excel.export_json_to_excel({
      // 表头
      header: Object.keys(USER_RELATIONS),
      // 数据
      data,
      // 文件名称
      filename: excelName.value || exportDefaultName
    });

    closed();
  };

  // excel 数据格式为二维数组
  const formatJson = (headers, rows) => {
    // 外层数据
    return rows.map((item) => {
      return Object.keys(headers).map((key) => {
        // 处理角色
        if (headers[key] === "role") {
          const roles = item[headers[key]];
          return JSON.stringify(roles.map((role) => role.title));
        }
        // 处理时间
        if (headers[key] === "openTime") {
          return dateFilter(item[headers[key]]);
        }
        return item[headers[key]];
      });
    });
  };

  const closed = () => {
    emits("update:modelValue", false);
  };
</script>

<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">
          {{ $t("msg.excel.close") }}
        </el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">
          {{ $t("msg.excel.confirm") }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
