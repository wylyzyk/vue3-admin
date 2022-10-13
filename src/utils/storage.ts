/**
 * save data
 */
export const setItem = (key: string, value: any) => {
  // simple data or complex data
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

/**
 * get data
 */
export const getItem = (key: string) => {
  const data = localStorage.getItem(key) as string;
  // 不能直接判断是否为json数据，所以通过try catch 进行界定
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

/**
 * delete Specified Data
 */
export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

/**
 * delete all data
 */
export const removeAllItem = () => {
  localStorage.clear();
};
