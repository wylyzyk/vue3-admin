import { defineComponent } from "vue";
// import Login from "@/views/login";
import { watchSwitchLanguage } from "./utils/i18n";
// import { useUserStore } from "./stores/user";
// import store from "./stores";
import { useUserStore } from "./stores/user";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const userStore = useUserStore();
    watchSwitchLanguage(() => {
      if (userStore.token) {
        userStore.getUserInfo();
      }
    });

    return () => (
      <>
        <RouterView />
      </>
    );
  }
});
