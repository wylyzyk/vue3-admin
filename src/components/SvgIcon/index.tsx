import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: {
    name: { type: String, required: true },
    color: { type: String },
    fillClass: { type: String }
  },
  setup(props) {
    const symbolId = computed(() => `#icon-${props?.name}`);

    return () => {
      const { fillClass, color } = props;
      return (
        <>
          <svg
            aria-hidden={true}
            style={{
              width: "1em",
              height: "1em",
              "vertical-align": "-0.15em",
              fill: "currentColor",
              overflow: "hidden"
            }}
          >
            <use
              xlinkHref={symbolId.value}
              class={["svg-icon", fillClass]}
              fill={color}
            />
          </svg>
        </>
      );
    };
  }
});
