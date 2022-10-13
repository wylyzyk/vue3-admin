import { defineComponent, computed } from "vue";
import SvgIcon from "@/components/SvgIcon";
import { useAppStore } from "@/stores/app";

export default defineComponent(() => {
  const appStore = useAppStore();
  const toggleClick = () => {
    appStore.triggerSidebarOpened();
  };

  const icon = computed(() => {
    return appStore.sidebarOpened ? "hamburger-opened" : "hamburger-closed";
  });

  return () => (
    <div style={{ padding: "4px 16px" }} onClick={toggleClick}>
      <span id={"guide-hamburger"}>
        <SvgIcon
          class={{
            display: "inline-block",
            verticalAlign: "middle",
            width: "20px",
            height: "20px"
          }}
          name={icon.value}
        />
      </span>
    </div>
  );
});
