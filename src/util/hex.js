const bigInt = require("big-integer");

export function hexToDec(hexStr) {
  const str = hexStr.startsWith('0x') ? hexStr.substr(2) : hexStr;
  return bigInt(str, 16);
}
