import { createApp } from "vue";
import store from "./stores";

import App from "./App";
import router from "./router";

import installI18n from "./i18n";

import "ant-design-vue/dist/antd.css";
import "@/styles/index.scss";

import "virtual:svg-icons-register";

import "./permission";

console.log(import.meta.env.VITE_BASE_URL);

const app = createApp(App);
app.use(router);

app.use(store);

installI18n(app);
// app.use(VueEmotion);

app.mount("#app");
