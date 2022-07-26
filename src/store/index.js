import { createStore } from "vuex";
import user from "./modules/user";
import app from "./modules/app";
import getters from "./getters";

const store = createStore({
  getters,
  modules: {
    user,
    app
  }
});

export default store;
