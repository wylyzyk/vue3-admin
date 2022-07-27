import { createApp } from "vue";
import App from "./App.vue";
import store from "./router";
import router from "./store";
import installSvgIcons from "@/icons";
import "@/styles/index.scss";
import "element-plus/dist/index.css";
import installElement from "./plugins/element";
import installI18n from "./i18n";
import "./premission";

const app = createApp(App);

installElement(app);
installSvgIcons(app);
installI18n(app);

app.use(router);
app.use(store);
app.mount("#app");
