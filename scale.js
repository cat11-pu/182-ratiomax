// scale.js：读两列并校验（长度一致、分母非零），否则报 E_ZERO_BASE
export function zeroBaseError(message) {
  const error = new Error(message);
  error.code = "E_ZERO_BASE";
  return error;
}

export function readColumns(numer, denom) {
  const left = Array.isArray(numer) ? numer : [];
  const right = Array.isArray(denom) ? denom : [];
  if (left.length !== right.length) {
    throw zeroBaseError("两列长度不一致");
  }
  for (let spot = 0; spot < right.length; spot += 1) {
    if (right[spot] === 0) {
      throw zeroBaseError("分母为零，位置 " + spot);
    }
  }
  return { numer: left.slice(), denom: right.slice() };
}
