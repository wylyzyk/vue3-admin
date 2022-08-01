<template>
  <div class="navbar">
    <Hamburger class="hamburger-container" />
    <Breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <HeaderSearch class="right-menu-item hover-effect" />
      <Screenfull class="right-menu-item hover-effect" />
      <ThemeSelect class="right-menu-item hover-effect" />
      <LangSelect class="right-menu-item hover-effect" />
      <!-- avatar -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <!-- <i class="el-icon-s-tools"></i> -->
          <el-icon>
            <Tools />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>{{ $t("msg.navBar.home") }}</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item divided @click="logout">
                {{ $t("msg.navBar.logout") }}
              </el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from "vuex";
  import Hamburger from "@/components/hamburger/index.vue";
  import Breadcrumb from "@/components/breadcrumb/index.vue";
  import LangSelect from "@/components/langSelect/index.vue";
  import ThemeSelect from "@/components/themeSelect/index.vue";
  import Screenfull from "@/components/screenfull/index.vue";
  import HeaderSearch from "@/components/headerSearch/index.vue";

  const store = useStore();
  const logout = () => {
    store.dispatch("user/logout");
  };
</script>

<style lang="scss" scoped>
  .navbar {
    overflow: hidden;
    height: 50px;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;

      transition: background 0.5s;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
    .breadcrumb-container {
      float: left;
    }
    .right-menu {
      display: flex;
      align-items: center;
      float: right;
      padding-right: 16px;

      :deep .avatar-container {
        cursor: pointer;
        .avatar-wrapper {
          position: relative;
          margin-top: 5px;
          .el-avatar {
            --el-avatar-background-color: none;
            margin-right: 12px;
          }
        }
      }

      :deep .right-menu-item {
        display: inline-block;
        padding: 0 18px 0 0;
        font-size: 24px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>
