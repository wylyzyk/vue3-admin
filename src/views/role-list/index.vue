<script setup>
  import { ref } from "vue";
  import { roleList } from "@/api/role";
  import { watchSwitchLanguage } from "@/utils/i18n";
  import DistributePermission from "./components/distributePermission.vue";

  const allRoles = ref([]);
  const getRoleList = async () => {
    allRoles.value = await roleList();
  };
  getRoleList();
  watchSwitchLanguage(getRoleList);

  const visible = ref(false);
  const selectRoleId = ref("");
  const onDestributePermissionClick = (row) => {
    visible.value = true;
    selectRoleId.value = row.id;
  };
</script>

<template>
  <div>
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column
          type="index"
          :label="$t('msg.role.index')"
          width="120"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.name')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.desc')"
          prop="describe"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          width="200"
          #default="{ row }"
        >
          <el-button
            type="primary"
            size="small"
            @click="onDestributePermissionClick(row)"
            v-permission="['distributePermission']"
          >
            {{ $t("msg.role.assignPermissions") }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <DistributePermission v-model="visible" :roleId="selectRoleId" />
  </div>
</template>

<style lang="scss" scoped></style>
