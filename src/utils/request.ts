import axios, { type AxiosRequestConfig } from "axios";
import { getTestICode } from "../../icode";
import store from "@/stores";
import { useAppStore } from "@/stores/app";
import { useUserStore } from "@/stores/user";
import { isCheckTimeout } from "./auth";

const service = axios.create({
  baseURL: "/api",
  timeout: 5000
});

const appStore = useAppStore(store);
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { icode, time } = getTestICode();
    config.headers!.icode = icode;
    config.headers!.codeType = time;

    const userStore = useUserStore(store);
    if (userStore.token) {
      if (isCheckTimeout()) {
        // token 失效退出登录
        userStore.logout();
        return Promise.reject(new Error("token expired"));
      }
      // 注入token
      config.headers!.Authorization = `Bearer ${userStore.token}`;
    }

    // 配置接口国际化
    config.headers!["Accept-Language"] = appStore.language;
    return config;
  },
  (error) => {
    const userStore = useUserStore(store);
    if (error.response?.data?.code === 401) {
      userStore.logout();
    }
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data;
    if (success) {
      return data;
    } else {
      return Promise.reject(new Error(message));
    }
  },
  (error) => {
    console.log("error");
    return Promise.reject(error);
  }
);

export default service;
