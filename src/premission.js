import router from "./router";
import store from "./store";

const defenderOfPass = ["/login"];

router.beforeEach(async (to, from, next) => {
  // logined
  if (store.getters.token) {
    if (to.path === "/login") {
      next("/");
    } else {
      // 判断用户资料是否存在，如果不存在则进行获取
      if (!store.getters.hasUserInfo) {
        await store.dispatch("user/getUserInfo");
      }
      next();
    }
  } else {
    // unlogin
    if (defenderOfPass.indexOf(to.path) > -1) {
      next();
    } else {
      next("/login");
    }
  }
});
