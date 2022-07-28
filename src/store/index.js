import { createStore } from "vuex";
import user from "./modules/user";
import app from "./modules/app";
import theme from "./modules/theme";
import getters from "./getters";

const store = createStore({
  getters,
  modules: {
    user,
    app,
    theme
  }
});

export default store;
