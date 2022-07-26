<script setup>
  import { getUserManageList, deleteUser } from "@/api/user-manage";
  import { watchSwitchLanguage } from "@/utils/i18n";
  import { ElMessage, ElMessageBox } from "element-plus";
  import { onActivated, ref, watch } from "vue";
  import { useI18n } from "vue-i18n";
  import { useRouter } from "vue-router";
  import ExportToExcel from "./components/export2Excel.vue";
  import RolesDialog from "./components/roles.vue";

  // 数据相关
  const tableData = ref([]);
  const total = ref(0);
  const page = ref(1);
  const size = ref(2);
  // 获取数据的方法
  const getListData = async () => {
    const { list, total: totalCount } = await getUserManageList({
      page: page.value,
      size: size.value
    });
    tableData.value = list;
    total.value = totalCount;
  };

  getListData();
  watchSwitchLanguage(getListData);
  onActivated(getListData);

  const handleSizeChange = (currentSize) => {
    size.value = currentSize;
    getListData();
  };

  const handleCurrentChange = (currentPage) => {
    page.value = currentPage;
    getListData();
  };

  // 查看用户详情
  // const router = useRouter();
  const onShowClick = (id) => {
    router.push(`/user/info/${id}`);
  };

  // 为员工分配角色
  const roleDialogVisible = ref(false);
  const selectUserId = ref("");
  const onShowRoleClik = (row) => {
    roleDialogVisible.value = true;
    selectUserId.value = row._id;
  };

  watch(roleDialogVisible, (val) => {
    if (!val) selectUserId.value = "";
  });

  // 删除用户
  const i18n = useI18n();
  const onRemove = (row) => {
    ElMessageBox.confirm(
      `${i18n.t("msg.excel.dialogTitle1")}
      ${row.username}
      ${i18n.t("msg.excel.dialogTitle2")}`,
      { type: "warning" }
    ).then(async () => {
      await deleteUser(row._id);
      ElMessage.success(i18n.t("msg.excel.removeSuccess"));
      getListData();
    });
  };

  // excel 导入事件
  const router = useRouter();
  const onExcelImport = () => {
    router.push("/user/import");
  };

  // 导出
  const exportToExcelVisible = ref(false);
  const onToExcelClick = () => {
    exportToExcelVisible.value = true;
  };
</script>

<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button
          type="primary"
          @click="onExcelImport"
          v-permission="['importUser']"
        >
          {{ $t("msg.excel.importExcel") }}
        </el-button>
        <el-button type="success" @click="onToExcelClick">{{
          $t("msg.excel.exportExcel")
        }}</el-button>
      </div>
    </el-card>

    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          prop="username"
          :label="$t('msg.excel.name')"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          :label="$t('msg.excel.mobile')"
        ></el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-scr-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t("msg.excel.defaultRole") }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="300"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="onShowClick(row._id)"
            >
              {{ $t("msg.excel.show") }}
            </el-button>
            <el-button
              type="info"
              size="small"
              @click="onShowRoleClik(row)"
              v-permission="['distributeRole']"
            >
              {{ $t("msg.excel.showRole") }}
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="onRemove(row)"
              v-permission="['removeUser']"
            >
              {{ $t("msg.excel.remove") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[2, 5, 10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <ExportToExcel v-model="exportToExcelVisible" />
    <RolesDialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @updateRole="getListData"
    />
  </div>
</template>

<style lang="scss" scoped>
  .user-manage-container {
    .header {
      margin-bottom: 22px;
      text-align: right;
    }
    ::v-deep .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    ::v-deep .el-tag {
      margin-right: 6px;
    }
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
