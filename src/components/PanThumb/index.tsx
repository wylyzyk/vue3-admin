import { defineComponent } from "vue";

import styled from "./index.module.scss";

interface IProps {
  image?: string;
  zIndex?: number;
  width?: string;
  height?: string;
}

const PanThumb = defineComponent<IProps>((props, { slots }) => {
  return () => {
    const { zIndex, width, height, image } = props;
    return (
      <div class={styled["pan-item"]} style={{ zIndex: zIndex || 0, height: height, width: width }}>
        <div class={styled["pan-info"]}>
          <div class={styled["pan-info-roles-container"]}>{slots.default && slots.default()}</div>
        </div>
        <div class={styled["pan-thumb"]} style={{ backgroundImage: `url(${image})` }}></div>
      </div>
    );
  };
});

PanThumb.name = "PanThumb";
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
PanThumb.props = {
  zIndex: 0,
  width: "",
  height: "",
  image: ""
} as IProps;

export default PanThumb;
