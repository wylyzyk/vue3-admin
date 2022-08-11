<script setup>
  import { userBatchImport } from "@/api/user-manage";
  import UploadExcel from "@/components/uploadExcel/index.vue";
  import { ElMessage } from "element-plus";
  import { useI18n } from "vue-i18n";
  import { useRouter } from "vue-router";
  import { USER_RELATIONS, formatDate } from "./utils";

  const i18n = useI18n();
  const router = useRouter();
  const onSuccess = async ({ results }) => {
    const updateData = generateData(results);
    await userBatchImport(updateData);
    ElMessage.success(`${results.length}${i18n.t("msg.excel.importSuccess")}`);
    router.push("/user/manage");
  };

  /**
   * 筛选数据
   */
  const generateData = (results) => {
    const arr = [];
    results.forEach((item) => {
      const userInfo = {};

      Object.keys(item).forEach((key) => {
        if (USER_RELATIONS[key] === "openTime") {
          userInfo[USER_RELATIONS[key]] = formatDate(item[key]);
          return;
        }
        userInfo[USER_RELATIONS[key]] = item[key];
      });
      arr.push(userInfo);
    });
    return arr;
  };
</script>

<template>
  <UploadExcel :onSuccess="onSuccess" />
</template>

<style lang="scss" scoped></style>
