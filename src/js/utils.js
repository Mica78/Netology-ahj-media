export function secToStr(s) {
  let m = Math.trunc(s / 60) + "";
  s = (s % 60) + "";
  return m.padStart(2, 0) + ":" + s.padStart(2, 0);
}

export function strToSec(str) {
  const arr = str.split(":");
  const m = parseInt(arr[0]);
  const s = parseInt(arr[1]);
  return m * 60 + s;
}
