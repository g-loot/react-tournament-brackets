import React, { createContext, useReducer } from 'react';

const initialState = {
  hoveredMatchId: null,
  hoveredPartyId: null,
  hoveredColumnIndex: null,
  hoveredRowIndex: null,
};
const store = createContext(initialState);
const { Provider } = store;

const MatchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer((previousState, action) => {
    switch (action.type) {
      case 'SET_HOVERED_PARTYID': {
        const { partyId, columnIndex, rowIndex, matchId } =
          action.payload ?? {};
        return {
          ...previousState,
          hoveredPartyId: partyId,
          hoveredColumnIndex: columnIndex,
          hoveredRowIndex: rowIndex,
          hoveredMatchId: matchId,
        };
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store as matchContext, MatchContextProvider };
