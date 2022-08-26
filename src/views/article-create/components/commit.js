import { articleEdit, createArticle } from "@/api/article";
import { ElMessage } from "element-plus";
import { i18n } from "@/i18n";

const t = i18n.global.t;

/**
 * 提交文章
 * @param {*} data
 * @returns
 */
export const commitArticle = async (data) => {
  const res = await createArticle(data);
  ElMessage.success(t("msg.article.createSuccess"));
  return res;
};

/**
 * 编辑文章
 */
export const editArticle = async (data) => {
  const res = await articleEdit(data);
  ElMessage.success(t("msg.article.editorSuccess"));
  return res;
};
