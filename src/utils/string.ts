export const sortAlphanumerically = (a, b) => {
  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
  });

  return collator.compare(a, b);
};
