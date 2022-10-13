export interface UserInfo {
  role: Role[];
  _id: string;
  id: string;
  username: string;
  title: string;
  avatar: string;
  permission: Permission;
}

export interface Permission {
  menus: string[];
  points: string[];
}

export interface Role {
  id: string;
  title: string;
}
