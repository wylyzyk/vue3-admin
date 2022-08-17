<script setup>
  import { defineProps, defineEmits, ref, watch } from "vue";
  import { roleList } from "@/api/role";
  import { watchSwitchLanguage } from "@/utils/i18n";
  import { userRoles } from "@/api/user-manage";

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  });

  const emits = defineEmits(["update:modelValue"]);

  const closed = () => {
    emits("update:modelValue", false);
  };

  const onConfirm = () => {
    closed();
  };

  const allRoleList = ref([]);
  const getListData = async () => {
    allRoleList.value = await roleList();
  };
  getListData();
  watchSwitchLanguage(getListData);

  // 当前用户角色
  const userRoleTitleList = ref([]);
  const getUserRoles = async () => {
    const res = await userRoles(props.userId);
    userRoleTitleList.value = res.role.map((item) => item.title);
  };

  watch(
    () => props.userId,
    (val) => {
      if (val) getUserRoles();
    }
  );
</script>

<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t("msg.universal.cancel") }}</el-button>
        <el-button type="primary" @click="onConfirm">
          {{ $t("msg.universal.confirm") }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
