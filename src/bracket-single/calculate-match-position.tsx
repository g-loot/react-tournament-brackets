export const calculateVerticalStartingPoint = (columnIndex, height) =>
  (2 ** columnIndex * (height / 4)) - (height / 4);

export const columnIncrement = (columnIndex, height) =>
  2 ** columnIndex * (height / 2);

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
