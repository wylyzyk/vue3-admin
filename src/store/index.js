import { createStore } from "vuex";
import user from "./modules/user";
import app from "./modules/app";
import theme from "./modules/theme";
import permission from "./modules/permission";
import getters from "./getters";

const store = createStore({
  getters,
  modules: {
    user,
    app,
    theme,
    permission
  }
});

export default store;
