import {hexToDec} from "@/util/hex";

const UNIT_WEI = 'wei';
const WEI_MULTIPLIER = 1;
const UNIT_GWEI = 'gwei';
const GWEI_MULTIPLIER = 1000000000;
const UNIT_ETHER = 'ether';
const ETH_MULTIPLIER = 1000000000000000000;

export function toWei(value, unit) {
  switch (unit) {
    case UNIT_WEI:
      return value * WEI_MULTIPLIER;
    case UNIT_GWEI:
      return value * GWEI_MULTIPLIER;
    case UNIT_ETHER:
      return value * ETH_MULTIPLIER;
  }
}

export function convert(from, fromUnit, toUnit) {
  if (fromUnit === toUnit) {
    return from;
  }
  if (fromUnit === UNIT_WEI) {
    if (toUnit === UNIT_GWEI) {
      return from / GWEI_MULTIPLIER;
    } else if (toUnit === UNIT_ETHER) {
      return from / ETH_MULTIPLIER;
    }
  } else if (fromUnit === UNIT_GWEI) {
    if (toUnit === UNIT_WEI) {
      return from * GWEI_MULTIPLIER;
    } else if (toUnit === UNIT_ETHER) {
      return from / GWEI_MULTIPLIER;
    }
  } else if (fromUnit === UNIT_ETHER) {
    if (toUnit === UNIT_WEI) {
      return from * ETH_MULTIPLIER;
    } else if (toUnit === UNIT_GWEI) {
      return from * GWEI_MULTIPLIER;
    }
  }
  return from;
}

export function weiToHumanFriendlyString(value) {
  if (value < 10000000) {
    return `${value} wei`;
  } else if (value < 100000000000) {
    return `${convert(value, 'wei', 'gwei')} gwei`;
  } else {
    return `${convert(value, 'wei', 'ether')} eth`;
  }
}

export function hexWeiFriendly(value) {
  return weiToHumanFriendlyString(hexToDec(value));
}
