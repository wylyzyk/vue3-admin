import store from "@/store";

function checkPermission(el, binding) {
  // 获取对应权限
  const { value } = binding;
  // 获取当前用户的所有功能权限
  const points = store.getters.userInfo.permission.points;
  // value 必须是一个数组
  if (value && value instanceof Array) {
    // 匹配对应指令
    const hasPermission = points.some((point) => {
      return value.includes(point);
    });
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  } else {
    throw new Error('v-permission value is must like ["admin", "editor"]');
  }
}

export default {
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding) {
    checkPermission(el, binding);
  },
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  update(el, binding) {
    checkPermission(el, binding);
  }
};
