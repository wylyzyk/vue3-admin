module.exports = {
  // 继承的规则
  extends: ["@commitlint/config-conventional"],
  roles: {
    "type-enum": [
      // 当前错误级别
      2,
      // 在什么情况下验证
      "always",
      // 泛型内容
      ["feat", "fix", "docs"],
    ],
    // subject 大小写不做校验
    "subject-case": [0],
  },
};
