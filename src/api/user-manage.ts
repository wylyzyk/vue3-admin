import request from "@/utils/request";

/**
 * 获取用户列表数据
 */
export const getUserManageList = (data: any) => {
  return request({
    url: "/user-manage/list",
    params: data
  });
};

/**
 * 导入用户
 */
export const userBatchImport = (data: any) => {
  return request({
    url: "/user-manage/batch/import",
    method: "POST",
    data
  });
};

/**
 * 删除指定数据
 */
export const deleteUser = (id: any) => {
  return request({
    url: `/user-manage/detele/${id}`
  });
};

/**
 * 获取所有用户列表数据
 */
export const getUserManageAllList = () => {
  return request({
    url: "/user-manage/all-list"
  });
};

/**
 * 获取用户详情
 */
export const userDetail = (id: string) => {
  return request({
    url: `/user-manage/detail/${id}`
  });
};

/**
 * 获取指定用户的角色
 */
export const userRoles = (id: string) => {
  return request({
    url: `/user-manage/role/${id}`
  });
};

/**
 * 为用户分配角色
 */
export const updateRole = (id: string, roles: any) => {
  return request({
    url: `/user-manage/update-role/${id}`,
    method: "POST",
    data: {
      roles
    }
  });
};