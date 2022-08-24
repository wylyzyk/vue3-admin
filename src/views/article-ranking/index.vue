<script setup>
  import { getArticleList } from "@/api/article";
  import { watchSwitchLanguage } from "@/utils/i18n";
  import { onActivated, ref } from "vue";

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

  const onShowClick = (row) => {
    console.log(row);
  };
  const onRemoveClick = (row) => {
    console.log(row);
  };
</script>

<template>
  <div class="article-ranking-container">
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          :label="$t('msg.article.ranking')"
          prop="ranking"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.title')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.author')"
          prop="author"
        ></el-table-column>
        <el-table-column :label="$t('msg.article.publicDate')">
          <template #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.article.desc')"
          prop="desc"
        ></el-table-column>
        <el-table-column :label="$t('msg.article.action')">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row)">{{
              $t("msg.article.show")
            }}</el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">{{
              $t("msg.article.remove")
            }}</el-button>
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
  }
</style>
