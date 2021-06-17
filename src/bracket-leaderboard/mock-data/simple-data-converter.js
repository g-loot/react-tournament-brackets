import { _mockData } from './backend-data';

const result = _mockData.map(
  ({
    id,
    name,
    nextLooserMatchId,
    nextMatchId,
    participants,
    parties,
    startTime,
    state,
    tournamentRound,
  }) => ({
    id,
    name,
    nextMatchId,
    nextLooserMatchId,
    tournamentRoundText: tournamentRound,
    startTime,
    state,
    participants: participants.map(participant => {
      const party = parties?.find(p => p?.id === participant?.partyId);

      return {
        id: participant.partyId,
        resultText: participant.result,

        isWinner: participant.placement === 1,
        status: participant.type,

        name: party?.teamEntity?.name || party?.partySlots?.[0]?.username,
        picture: party?.teamEntity?.picture,
      };
    }),
  })
);
// eslint-disable-next-line no-console
console.log(JSON.stringify(result));

// const playerSlot = {
//   id: 4719864271863808,
//   username: 'giacomo123',
// };

// const participant = {
//   id: '14754a1a-932c-4992-8dec-f7f94a339960',
//   resultText: null,
//   isWinner: false,
//   type: null,

//   name: 'CoKe BoYz',
//   picture: 'teamlogos/client_team_default_logo',
//   partySlots: [playerSlot],
// };
