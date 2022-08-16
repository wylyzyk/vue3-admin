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
import installFilters from "@/filter";
import installDirective from "@/directives";

const app = createApp(App);

installElement(app);
installSvgIcons(app);
installI18n(app);
installFilters(app);
installDirective(app);

app.use(router);
app.use(store);
app.mount("#app");
