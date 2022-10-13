import { h, defineComponent, ref, onMounted, onUnmounted } from "vue";
import SvgIcon from "@/components/SvgIcon";
import screenfull from "screenfull";

const ScreenFull = defineComponent({
  setup() {
    const isFullscreen = ref(false);

    const change = () => {
      isFullscreen.value = screenfull.isFullscreen;
    };

    // 切换
    const onToggle = () => {
      screenfull.toggle();
    };

    // 设置侦听器
    onMounted(() => {
      screenfull.on("change", change);
    });

    // 删除侦听器
    onUnmounted(() => {
      screenfull.off("change", change);
    });

    return () => (
      <div onClick={onToggle} id={"guide-full"}>
        <SvgIcon
          class={"svg-icon"}
          name={isFullscreen.value ? "exit-fullscreen" : "full-screen"}
        />
      </div>
    );
  }
});

export default ScreenFull;
