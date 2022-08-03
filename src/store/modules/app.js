import { LANG, TAGS_VIEW } from "@/constant";
import { getItem, setItem } from "@/utils/storage";

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || "zh",
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened;
    },
    /**
     * 设置国际化
     */
    setLanguage(state, lang) {
      setItem(LANG, lang);
      state.language = lang;
    },
    /**
     * 添加tags
     */
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find((item) => item.path === tag.path);
      if (!isFind) {
        state.tagsViewList.push(tag);
        setItem(TAGS_VIEW, state.tagsViewList);
      }
    },
    /**
     * 为指定的tag修改title
     */
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag;
      setItem(TAGS_VIEW, state.tagsViewList);
    },
    /**
     * 移除指定tag
     * @param {*} state
     * @param { type: "other" | "right" | "index", index } payload
     */
    removeTagsView(state, payload) {
      const { type, index } = payload;
      if (type === "other") {
        // state.tagsViewList = [state.tagsViewList[index]];

        state.tagsViewList.splice(
          index + 1,
          state.tagsViewList.length - index + 1
        );
        state.tagsViewList.splice(0, index);
      } else if (type === "right") {
        // state.tagsViewList.forEach((value, i) => {
        //   if (i === index) {
        //     state.tagsViewList = [state.tagsViewList[index]];
        //   }
        // });
        state.tagsViewList.splice(
          index + 1,
          state.tagsViewList.length - index + 1
        );
      } else if (type === "index") {
        state.tagsViewList.splice(index, 1);
      }

      setItem(TAGS_VIEW, state.tagsViewList);
    }
  }
};
