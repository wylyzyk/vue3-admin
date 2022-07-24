import store from "@/store";
import axios from "axios";
import { ElMessage } from "element-plus";
import { getTestICode } from "../../icode";
import { isCheckTimeout } from "./auth";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
});

service.interceptors.request.use(
  (config) => {
    const { icode, time } = getTestICode();
    config.headers.icode = icode;
    config.headers.codeType = time;

    if (store.getters.token) {
      if (isCheckTimeout()) {
        // token 失效退出登录
        store.dispatch("user/logout");
        return Promise.reject(new Error("token expired"));
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
    return config;
  },
  (error) => {
    // token 过期问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch("user/logout");
    }
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  // 请求成功
  (response) => {
    const { success, message, data } = response.data;
    if (success) {
      return data;
    } else {
      ElMessage.error(message);
      return Promise.reject(new Error(message));
    }
  },
  // 请求失败
  (error) => {
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);

export default service;
