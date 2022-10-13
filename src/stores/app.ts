import type { RouteLocationNormalizedLoaded } from "vue-router";
import { LANG, TAGS_VIEW } from "@/constants";
import { getItem, setItem } from "@/utils/storage";
import { defineStore } from "pinia";

export type TTag = RouteLocationNormalizedLoaded & { title?: string };

interface IPayload {
  type: "index" | "other" | "right";
  index: number;
}

interface IAppState {
  language: string;
  sidebarOpened: boolean;
  tagsViewList: TTag[];
}

export const useAppStore = defineStore("appStore", {
  state: () => {
    return {
      language: getItem(LANG) || "zh",
      sidebarOpened: true,
      tagsViewList: getItem(TAGS_VIEW) || []
    } as IAppState;
  },
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened;
    },
    setLanguage(lang: string) {
      setItem(LANG, lang);
      this.language = lang;
    },
    addTagsViewList(tag: TTag) {
      const isFind = this.tagsViewList.find(
        (item: TTag) => item.path === tag.path
      );
      if (!isFind) {
        this.tagsViewList.push(tag);
        setItem(TAGS_VIEW, this.tagsViewList);
      }
    },
    changeTagsView({ index, tag }: { index: number; tag: TTag }) {
      this.tagsViewList[index] = tag;
      setItem(TAGS_VIEW, this.tagsViewList);
    },
    removeTagsView(payload: IPayload) {
      const { type, index } = payload;
      switch (type) {
        case "other":
          this.tagsViewList.splice(
            index + 1,
            this.tagsViewList.length - index + 1
          );
          this.tagsViewList.splice(0, index);
          break;
        case "right":
          this.tagsViewList.splice(
            index + 1,
            this.tagsViewList.length - index + 1
          );
          break;
        case "index":
          this.tagsViewList.splice(index, 1);
          break;
        default:
          return this.tagsViewList;
      }
      setItem(TAGS_VIEW, this.tagsViewList);
    }
  }
});
