import SvgIcon from "@/components/SvgIcon";

/**
 * 1.导入所有的svg图标
 * 2.完成svgIcon的全局注册
 */

// require.context 返回一个require对象，require对象接收一个参数request
const svgRequire = require.context("./svg", false, /\.svg$/);

svgRequire.keys().forEach((svgIcon) => {
  return svgRequire(svgIcon);
});

export default (app) => {
  app.component("svg-icon", SvgIcon);
};
