import { sortAlphanumerically } from 'Utils/string';

export const generatePreviousRound = (matchesColumn, listOfMatches) =>
  matchesColumn.reduce((result, match) => {
    return [
      ...result,
      ...listOfMatches
        .filter(m => m.nextMatchId === match.id)
        .sort((a, b) => sortAlphanumerically(a.name, b.name)),
    ];
  }, []);
