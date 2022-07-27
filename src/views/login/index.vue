<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      ref="loginFormRef"
    >
      <div class="title-container">
        <h3 class="title">{{ $t("msg.login.title") }}</h3>
        <LangSelect class="lang-select" />
      </div>
      <el-form-item prop="username">
        <span class="svg-container"> <svg-icon icon="user"></svg-icon> </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>
        <el-input
          placeholder="password"
          name="password"
          :type="inputType"
          v-model="loginForm.password"
        ></el-input>
        <span class="show-pwd" @click="handleChangeInputType">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
      >
        {{ $t("msg.login.loginBtn") }}
      </el-button>

      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
  import { reactive, ref } from "vue";
  import { useStore } from "vuex";
  import { validatePassword } from "./rules";
  import LangSelect from "@/components/langSelect/index.vue";
  import { useI18n } from "vue-i18n";

  const i18n = useI18n();
  // 数据源
  const loginForm = reactive({
    username: "admin",
    password: "123456"
  });
  // 验证规则
  const loginRules = reactive({
    username: [
      {
        required: true,
        trigger: "blur",
        message: i18n.t("msg.login.usernameRule")
      }
    ],
    password: [
      {
        requried: true,
        trigger: "blur",
        validator: validatePassword()
      }
    ]
  });
  // 处理密码明文显示
  const inputType = ref("password");
  const handleChangeInputType = () => {
    if (inputType.value === "password") {
      inputType.value = "text";
    } else {
      inputType.value = "password";
    }
  };
  // 处理登录
  const loading = ref(false);
  const loginFormRef = ref(null);
  const store = useStore();
  const handleLogin = () => {
    // 1. 表单校验
    console.log(loginFormRef.value);
    loginFormRef.value.validate((valid) => {
      if (!valid) return;
      loading.value = true;
      store
        .dispatch("user/login", loginForm)
        .then(() => {
          // 2. 登录成功
          loading.value = false;
          // 3. 登录后处理
        })
        .catch((err) => {
          console.log(err);
          loading.value = false;
        });
    });
  };
</script>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  $cursor: #fff;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      padding: relative;
      width: 520px;
      // max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;

      &:deep .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
      }

      :deep .el-input__wrapper {
        background: transparent;
        border: none;
        box-shadow: none;
        &:focus {
          box-shadow: none;
        }
      }

      :deep .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
          height: 47px;
          background: transparent;
          border: none;
          -webkit-appearance: none;
          border-radius: 0;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          caret-color: $cursor;
        }
      }
      .tips {
        font-size: 16px;
        color: #fff;
        line-height: 24px;
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }

    .title-container {
      position: relative;
      text-align: center;
      margin: 0 auto 40px auto;
      .title {
        font-size: 26px;
        color: $light_gray;
        font-weight: bold;
      }
    }

    .show-pwd {
      padding: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: #fff;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
</style>
