import { defineComponent } from "vue";
import SvgIcon from "@/components/SvgIcon";
import { generateTitle } from "@/utils/i18n";

export default defineComponent({
  name: "MenuItem",
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true }
  },
  setup(props) {
    return () => {
      const { title, icon } = props;
      return (
        <div style={{ paddingLeft: "5px" }}>
          <SvgIcon name={icon} />
          <span style={{ marginLeft: "22px" }}>{generateTitle(title)}</span>
        </div>
      );
    };
  }
});
