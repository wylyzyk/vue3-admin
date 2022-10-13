import md5 from "md5";
export function getTestICode() {
  const now = parseInt(String(Date.now() / 1000));
  const code = now + "LGD_Sunday-1991-12-30";
  return {
    icode: md5(code),
    time: now
  };
}
