export function validatePassword() {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error("密码不能少于六位"));
    } else {
      callback();
    }
  };
}
