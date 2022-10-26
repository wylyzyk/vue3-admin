import PanThumb from "@/components/PanThumb";
import SvgIcon from "@/components/SvgIcon";
import { useUserStore } from "@/stores/user";
import type { IFeature } from "@/types/profile";
import { Card, Progress } from "ant-design-vue";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import styled from "./styles/projectCard.module.scss";

interface IProps {
  features: IFeature[];
}

const ProjectCard = defineComponent<IProps>((props) => {
  const i18n = useI18n();
  const userStore = useUserStore();
  return () => {
    const { features } = props;
    return (
      <Card class={styled["user-container"]}>
        {{
          title: () => (
            <div class={styled["header"]}>
              <span>{i18n.t("msg.profile.introduce")}</span>
            </div>
          )
        }}
        <div class={styled["user-profile"]}>
          <div class={styled["box-center"]}>
            <PanThumb image="https://avatars.githubusercontent.com/u/49738226?v=4" width="100px" height="100px">
              <div>hello</div>
              {userStore.userInfo?.title}
            </PanThumb>
          </div>
          <div class="user-name text-center">{userStore.userInfo.username}</div>
          <div class="user-role text-center text-muted">{userStore.userInfo.title}</div>
        </div>

        <div class={styled["project-bio"]}>
          <div class={styled["project-bio-section"]}>
            <div class={styled["project-bio-section-header"]}>
              <SvgIcon name="introduce" />
              <span>{i18n.t("msg.profile.projectIntroduction")}</span>
            </div>
            <div class={styled["project-bio-section-body"]}>
              <div class="text-muted">{i18n.t("msg.profile.muted")}</div>
            </div>
          </div>
        </div>

        <div class={styled["project-bio-section"]}>
          <div class={styled["project-bio-section-header"]}>
            <SvgIcon name="reward" />
            <span>{i18n.t("msg.profile.projectFunction")}</span>
          </div>
          <div class={styled["project-bio-section-body"]}>
            {features.map((item) => {
              return (
                <div class="progress-item" key={item.id}>
                  <div class="text-muted">{item.title}</div>
                  <Progress status="success" percent={item.percentage} />
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    );
  };
});

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
ProjectCard.props = {
  features: []
} as IProps;

export default ProjectCard;
