<script setup>
  import { ElMessage } from "element-plus";
  import { defineProps, ref } from "vue";
  import XLSX from "xlsx";
  import { getHeaderRow, isExcel } from "./utils";

  const props = defineProps({
    // 上传之前的回调
    beforeUpload: Function,
    // 上传成功的回调
    onSuccess: Function
  });

  // 点击上传触发
  const loading = ref(false);
  const excelUploadInput = ref(null);
  const handleUpload = () => {
    excelUploadInput.value.click();
  };
  const handleChange = (e) => {
    const files = e.target.files;
    const rawFile = files[0];
    if (!rawFile) return;
    upload(rawFile);
  };

  // 拖拽上传
  const handleDrop = (e) => {
    // 上传中
    if (loading.value) return;
    const files = e.dataTransfer.files;
    if (files.length !== 1) {
      ElMessage.error("必须要有一个文件");
      return;
    }
    const rawFile = files[0];
    if (!isExcel(rawFile)) {
      ElMessage.error("文件必须是 .xlsx .xls .csv 格式");
      return;
    }
  };
  const handleDragover = (e) => {
    // 在新位置生成源的副本
    e.dataTransfer.dropEffect = "copy";
  };

  /**
   * 触发上传事件
   */
  const upload = (rawFile) => {
    excelUploadInput.value.value = null;
    // 没有指定上传前回调的话
    if (!props.beforeUpload) {
      readerData(rawFile);
      return;
    }
    // 指定了上传前的回调, 在返回true的时候,执行相应操作
    const before = props.beforeUpload(rawFile);
    if (before) {
      readerData(rawFile);
    }
  };

  /**
   * 读取数据
   */
  const readerData = (rawFile) => {
    loading.value = true;
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, _reject) => {
      const reader = new FileReader();

      // 读取操作完成时触发
      reader.onload = (e) => {
        // 1. 获取到解析后的数据
        const data = e.target.result;
        // 2. 利用XLSX对数据进行解析
        const workbook = XLSX.read(data, { type: "array" });
        // 3. 获取第一张表格
        const firstName = workbook.SheetNames[0];
        // 4. 读取sheet1 (第一章表格) 的数据
        const workSheet = workbook.Sheets[firstName];
        // 5. 解析数据表头
        const header = getHeaderRow(workSheet);
        // 6. 解析数据体
        const results = XLSX.utils.sheet_to_json(workSheet);
        // 7. 传入解析后的数据
        generateData({ header, results });
        // 8. 处理loading
        loading.value = false;
        // 9. 成功回调
        resolve();
      };

      reader.readAsArrayBuffer(rawFile);
    });
  };

  // 根据导入内容,生成数据
  const generateData = (excelData) => {
    props.onSuccess && props.onSuccess(excelData);
  };
</script>
<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t("msg.uploadExcel.upload") }}
      </el-button>
    </div>
    <input
      type="file"
      ref="excelUploadInput"
      class="excel-upload-input"
      accept=".xlsx, .xls"
      @change="handleChange"
    />

    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragenter"
    >
      <el-icon>
        <Upload />
      </el-icon>
      <span>{{ $t("msg.uploadExcel.drop") }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .upload-excel {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    .excel-upload-input {
      display: none;
      z-index: -9999;
    }
    .btn-upload,
    .drop {
      border: 1px dashed #bbb;
      width: 350px;
      height: 160px;
      text-align: center;
      line-height: 160px;
    }
    .drop {
      line-height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #bbb;
      i {
        font-size: 60px;
        display: block;
      }
    }
  }
</style>
