import type { IFeature } from "@/types/profile";
import { Collapse } from "ant-design-vue";
import { defineComponent } from "vue";

interface IProps {
  features: IFeature[];
}

const Feature = defineComponent<IProps>((props) => {
  return () => {
    const { features } = props;
    return (
      <Collapse accordion={true}>
        {features?.map((item) => {
          return (
            <Collapse.Panel key={item.id} header={item.title}>
              <div v-html={item.content}></div>
            </Collapse.Panel>
          );
        })}
      </Collapse>
    );
  };
});

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
Feature.props = {
  features: []
} as IProps;

export default Feature;
