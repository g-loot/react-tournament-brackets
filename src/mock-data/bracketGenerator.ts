import { drawEngine, tournamentEngine, mocksEngine } from 'tods-competition-factory';

export function bracketGenerator({ drawSize = 32 }={}) {

  const { tournamentRecord } = mocksEngine.generateTournamentRecord({ drawProfiles: [{ drawSize }], completeAllMatchUps: true });
  tournamentEngine.setState(tournamentRecord);
  const { matchUps } = tournamentEngine.allTournamentMatchUps();
  const sortedMatchUps = matchUps.sort(drawEngine.matchUpSort).reverse();

  const bracketData = sortedMatchUps.map((matchUp) => {
    const { matchUpId, endDate, sides, roundName, roundNumber, roundPosition, winnerMatchUpId, loserMatchUpId, winningSide } = matchUp;
    const participants = sides.map((side) => {
      const { sideNumber, participant } = side;
      const { participantId, participantName } = participant || {};
      const isWinner = winningSide && sideNumber === winningSide;
      return {
        id: participantId,
        name: participantName,
        resultText: isWinner ? 'Won' : 'Lost',
        status: 'PLAYED',
        isWinner,
      };
    });
    const match = {
      id: matchUpId,
      name: `Round ${roundName} - Match ${roundPosition}`,
      nextMatchId: winnerMatchUpId,
      nextLooserId: loserMatchUpId,
      tournamentRoundText: roundNumber,
      state: 'SCORE_DONE',
      startTime: endDate,
      participants,
    }
    return match;
  });

  return bracketData;
}