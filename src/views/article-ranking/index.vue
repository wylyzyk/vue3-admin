<script setup>
  import { onActivated, onMounted, ref } from "vue";
  import { getArticleList } from "@/api/article";
  import { watchSwitchLanguage } from "@/utils/i18n";
  import { selectDaynamicLabel, dynamicData, tableColumns } from "./dynamic";
  import { tableRef, initSortable } from "./sortable";
  import { ElMessageBox, ElMessage } from "element-plus";
  import { useI18n } from "vue-i18n";
  import { deleteArticle } from "@/api/article";
  import { useRouter } from "vue-router";

  const tableData = ref([]);
  const page = ref(1);
  const size = ref(10);
  const total = ref(0);

  const getListData = async () => {
    const { list, total: resultTotal } = await getArticleList({
      page: page.value,
      size: size.value
    });
    tableData.value = list;
    total.value = resultTotal;
  };
  getListData();
  watchSwitchLanguage(getListData);
  onActivated(getListData);

  onMounted(() => {
    initSortable(tableData, getListData);
  });

  const handleSizeChange = (currentSize) => {
    size.value = currentSize;
    getListData();
  };

  const handleCurrentChange = (currentPage) => {
    page.value = currentPage;
    getListData();
  };

  const router = useRouter();
  const onShowClick = (row) => {
    router.push(`/article/${row._id}`);
  };

  const i18n = useI18n();
  const onRemoveClick = (row) => {
    ElMessageBox.confirm(
      i18n.t("msg.article.dialogTitle1") +
        row.title +
        i18n.t("msg.article.dialogTitle2"),
      {
        type: "warning"
      }
    ).then(async () => {
      await deleteArticle(row._id);
      ElMessage.success(i18n.t("msg.article.removeSuccess"));
      // 重新渲染数据
      getListData();
    });
  };
</script>

<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t("msg.article.dynamicTitle") }}</span>
        <el-checkbox-group v-model="selectDaynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :label="item.label"
            :key="index"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          v-for="({ prop, label }, index) in tableColumns"
          :key="index"
          :label="label"
          :prop="prop"
        >
          <template v-if="prop === 'publicDate'" #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>

          <template v-else-if="prop === 'action'" #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row)">
              {{ $t("msg.article.show") }}
            </el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">
              {{ $t("msg.article.remove") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, next, pager, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
  .article-ranking-container {
    .header {
      margin-bottom: 20px;
      .dynamic-box {
        display: flex;
        align-items: center;
        .title {
          margin-right: 20px;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }

    ::v-deep .el-table__row {
      cursor: pointer;
    }

    .pagination {
      margin-top: 20px;
      text-align: center;
    }

    :v-deep .sortable-ghost {
      opacity: 0.6;
      color: #fff;
      background-color: #304156;
    }
  }
</style>
