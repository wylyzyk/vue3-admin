const getters = {
  token: (state) => state.user.token,
  // 返回true，则表示用户信息存在
  hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== "{}",
  userInfo: (state) => state.user.userInfo
};

export default getters;
