import { getUserInfo, login } from "@/api/sys";
import { TOKEN } from "@/constant";
import router from "@/router";
import { setTimeStamp } from "@/utils/auth";
import { getItem, removeAllItem, setItem } from "@/utils/storage";
import md5 from "md5";

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || "",
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
      setItem(TOKEN, token);
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
    /**
     * 登录请求
     * @param {*} context
     * @param {*} userInfo
     * @returns
     */
    login(context, userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((data) => {
            context.commit("setToken", data.token);
            router.push("/");
            // 保存登录时间
            setTimeStamp();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     * 获取用户信息
     * @param {*} context
     * @param {*} userInfo
     * @returns
     */
    async getUserInfo(context) {
      const res = await getUserInfo();
      context.commit("setUserInfo", res);
      return res;
    },
    logout(context) {
      context.commit("setToken", "");
      context.commit("setUserInfo", {});
      removeAllItem();
      // TODO: 清理权限
      router.push("/login");
    }
  }
};
