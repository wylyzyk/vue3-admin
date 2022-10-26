import { defineComponent, ref } from "vue";
import { feature } from "@/api/user";
import { watchSwitchLanguage } from "@/utils/i18n";
import { Row, Col, Card, Tabs } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import Author from "@/views/profile/components/author";
import Chapter from "@/views/profile/components/chapter";
import Feature from "./components/feature";
import ProjectCard from "./components/projectCard";

export default defineComponent(() => {
  const activeName = ref("feature");
  const featureData = ref([]);
  const getFeatureData = async () => {
    featureData.value = await feature();
  };
  getFeatureData();

  watchSwitchLanguage(getFeatureData());

  const i18n = useI18n();

  return () => (
    <div class="my-container">
      <Row>
        <Col span={6}>
          <ProjectCard style={{ marginRight: "20px" }} features={featureData.value} />
        </Col>
        <Col span={18}>
          <Card>
            <Tabs v-model:activeKey={activeName.value}>
              <Tabs.TabPane key={"feature"} tab={i18n.t("msg.profile.feature")}>
                <Feature features={featureData.value} />
              </Tabs.TabPane>
              <Tabs.TabPane key={"chapter"} tab={i18n.t("msg.profile.chapter")}>
                <Chapter />
              </Tabs.TabPane>
              <Tabs.TabPane key={"author"} tab={i18n.t("msg.profile.author")}>
                <Author />
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
});
