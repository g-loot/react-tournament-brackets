export function calculateSVGDimensions(
  columns: any[],
  rowHeight: any,
  columnWidth: any,
  canvasPadding: any,
  roundHeader: any,
  currentRound: string
) {
  const bracketHeight = columns[0].length * rowHeight;
  const bracketWidth = columns.length * columnWidth;

  const gameHeight =
    bracketHeight +
    canvasPadding * 2 +
    (roundHeader.isShown ? roundHeader.height + roundHeader.marginBottom : 0);
  const gameWidth = bracketWidth + canvasPadding * 2;
  const startPosition = [
    currentRound
      ? -(parseInt(currentRound, 10) * columnWidth - canvasPadding * 2)
      : 0,
    0,
  ];
  return { gameWidth, gameHeight, startPosition };
}
