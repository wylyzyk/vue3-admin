import request from "@/utils/request";

/**
 * login interface
 */

export const login = (data: { username: string; password: string }) => {
  return request({
    url: "/sys/login",
    method: "POST",
    data
  });
};

export const getUserInfo = () => {
  return request({
    url: "/sys/profile"
  });
};
