import { defineStore } from "pinia";
import { getItem } from "@/utils/storage";
import { DEFAULT_COLOR, MAIN_COLOR } from "@/constants";
import variables from "@/styles/variables.module.scss";

export const useThemeStore = defineStore("themeStore", {
  state: () => {
    return {
      mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
      variables
    };
  },
  actions: {
    setMainColor(newColor: string) {
      console.log(this.variables);
      this.mainColor = newColor;
      this.variables;
    }
  }
});
