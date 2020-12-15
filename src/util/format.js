export function friendlyBlockNumber(blockNumber) {
  return `#${numberWithCommas(blockNumber)}`;
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function truncateStr(value) {
  return `${value.substr(0, 6)}...${value.substr(value.length - 4, 4)}`;
}
