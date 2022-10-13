import { login as userLogin, getUserInfo as userInfo } from "@/api/sys";
import { TOKEN } from "@/constants";
import { getItem, removeAllItem, setItem } from "@/utils/storage";
import router, { resetRouter } from "@/router";
import { defineStore } from "pinia";
import md5 from "md5";
import { setTimeStamp } from "@/utils/auth";
import type { UserInfo } from "@/types/user";

interface IUserState {
  token: string;
  userInfo: UserInfo;
}

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      token: getItem(TOKEN) || "",
      userInfo: {}
    } as IUserState;
  },
  getters: {
    hasUserInfo: (state) => JSON.stringify(state.userInfo) !== "{}"
  },
  actions: {
    login(userInfo: { username: string; password: string }) {
      const { username, password } = userInfo;
      return new Promise<void>((resolve, reject) => {
        userLogin({ username, password: md5(password) })
          .then((data) => {
            this.token = data.token;
            setItem(TOKEN, data.token);

            router.push("/");
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
     */
    async getUserInfo() {
      const res = await userInfo();
      this.userInfo = res;
      return res;
    },
    logout() {
      resetRouter();
      this.token = "";
      this.userInfo = {} as UserInfo;
      removeAllItem();
      router.push("/login");
    }
  }
});
