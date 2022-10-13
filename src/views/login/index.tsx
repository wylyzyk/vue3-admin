import { h, defineComponent, ref } from "vue";
import { Form, Input, Button, notification } from "ant-design-vue";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined
} from "@ant-design/icons-vue";

import type { Rule } from "ant-design-vue/es/form";

import styled from "./index.module.scss";
import { useI18n } from "vue-i18n";
import { validatePassword } from "./rules";
import LangSelect from "@/components/LangSelect";
import { useUserStore } from "@/stores/user";

interface IFormState {
  username: string;
  password: string;
}

export default defineComponent({
  name: "Login",
  setup() {
    const loginForm = ref<IFormState>({
      username: "super-admin",
      password: "123456"
    });
    const i18n = useI18n();

    // 校验规则
    const loginRules = ref<Record<string, Rule[]>>({
      username: [
        {
          required: true,
          trigger: "blur",
          message: i18n.t("msg.login.usernameRule")
        }
      ],
      password: [
        { required: true, trigger: "blur", validator: validatePassword() }
      ]
    });
    // 处理密码明文显示
    const inputType = ref("password");
    const handleChangeInputType = () => {
      inputType.value = inputType.value === "text" ? "password" : "text";
    };

    const loading = ref(false);
    const userStore = useUserStore();
    // store.
    const useForm = Form.useForm;
    const { resetFields } = useForm(loginForm, loginRules);
    const onFinish = (values: IFormState) => {
      console.log(values);
      userStore
        .login(values)
        .then(() => {
          loading.value = true;
          resetFields();
        })
        .catch((err: Error) => {
          notification.error(err);
          loading.value = false;
        });
    };

    return () => (
      <>
        <div class={styled["login-container"]}>
          <Form
            class={styled["login-form"]}
            model={loginForm.value}
            rules={loginRules.value}
            onFinish={onFinish}
          >
            <div class={styled["title-container"]}>
              <h3 class={styled["title"]}>{i18n.t("msg.login.title")}</h3>
              <LangSelect class={styled["lang-select"]} />
              {/* <div class={styled["lang-select"]}></div> */}
            </div>
            <Form.Item class={styled["form-item"]} name="username">
              <Input
                class={styled["input-wrapper"]}
                placeholder="username"
                type="text"
                v-model:value={loginForm.value.username}
                v-slots={{
                  prefix: () => <UserOutlined />
                }}
              />
            </Form.Item>
            <Form.Item class={styled["form-item"]} name="password">
              <Input
                class={styled["input-wrapper"]}
                placeholder="password"
                type={inputType.value}
                v-model:value={loginForm.value.password}
                v-slots={{
                  prefix: () => <LockOutlined />,
                  suffix: () =>
                    inputType.value === "password" ? (
                      <EyeInvisibleOutlined onClick={handleChangeInputType} />
                    ) : (
                      <EyeOutlined onClick={handleChangeInputType} />
                    )
                }}
              />
            </Form.Item>

            <Button
              type={"primary"}
              htmlType={"submit"}
              style={{ width: "100%", marginBottom: "30px" }}
              loading={loading.value}
              // onClick={handleSubmitClick}
            >
              {i18n.t("msg.login.loginBtn")}
            </Button>
            <div class={styled.tips} v-html={i18n.t("msg.login.desc")}></div>
          </Form>
        </div>
      </>
    );
  }
});
