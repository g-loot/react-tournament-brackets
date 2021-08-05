export const calculateVerticalStartingPoint = (columnIndex, height) =>
  2 ** columnIndex * (height / 2) - height / 2;

export const columnIncrement = (columnIndex, height) =>
  2 ** columnIndex * height;

export const calculateHeightIncrease = (columnIndex, rowIndex, height) =>
  columnIncrement(columnIndex, height) * rowIndex;

export const calculateVerticalPositioning = ({
  rowIndex,
  columnIndex,
  rowHeight: height,
}) => {
  return (
    calculateHeightIncrease(columnIndex, rowIndex, height) +
    calculateVerticalStartingPoint(columnIndex, height)
  );
};

export const calculatePositionOfFinalGame = (
  rowIndex,
  columnIndex,
  {
    canvasPadding,
    rowHeight,
    columnWidth,
    gameHeight,
    upperBracketHeight,
    lowerBracketHeight,

    offsetX = 0,
    offsetY = 0,
  }
) => {
  const yResult =
    gameHeight * (lowerBracketHeight / upperBracketHeight) - rowHeight;

  return {
    x: columnIndex * columnWidth + canvasPadding + offsetX,
    y: yResult + canvasPadding + offsetY,
  };
};

export const calculatePositionOfMatchUpperBracket = (
  rowIndex,
  columnIndex,
  { canvasPadding, rowHeight, columnWidth, offsetX = 0, offsetY = 0 }
) => {
  const yResult = calculateVerticalPositioning({
    rowHeight,
    rowIndex,
    columnIndex,
  });

  const skipStep = index => Math.floor((index + 1) * 2) - 3;

  const xResult =
    columnIndex === 0 || columnIndex === 1
      ? columnIndex * columnWidth
      : skipStep(columnIndex) * columnWidth;

  return {
    x: xResult + canvasPadding + offsetX,
    y: yResult + canvasPadding + offsetY,
  };
};

export const returnLowerBracketColumnIndex = columnIndex =>
  Math.ceil((columnIndex + 1) / 2) - 1;

export const calculatePositionOfMatchLowerBracket = (
  rowIndex,
  columnIndex,
  { canvasPadding, rowHeight, columnWidth, offsetX = 0, offsetY = 0 }
) => {
  const result = calculateVerticalPositioning({
    rowHeight,
    rowIndex,
    columnIndex: returnLowerBracketColumnIndex(columnIndex),
  });

  return {
    x: columnIndex * columnWidth + canvasPadding + offsetX,
    y: result + canvasPadding + offsetY,
  };
};
