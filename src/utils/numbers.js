export const precisionRound = (number, precision) => {
  if (Number.isNaN(Number(number))) return number;
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
};
