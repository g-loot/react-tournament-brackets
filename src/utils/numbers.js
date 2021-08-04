export const precisionRound = (number, precision) => {
  if (Number.isNaN(Number(number))) return number;
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
};

export const returnEven = num => (num !== 0 ? num - 1 * (num % 2) : 0);
export const returnOdd = num => (num !== 0 ? num - 1 + 1 * (num % 2) : 0);
