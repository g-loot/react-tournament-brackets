import { returnEven, returnOdd } from '../utils';

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

export const calculatePositionOfMatch = (
  rowIndex,
  columnIndex,
  { canvasPadding, rowHeight, columnWidth, offsetX = 0, offsetY = 0 }
) => {
  const result = calculateVerticalPositioning({
    rowHeight,
    rowIndex,
    columnIndex,
  });

  return {
    x: columnIndex * columnWidth + canvasPadding + offsetX,
    y: result + canvasPadding + offsetY,
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
