import React from 'react';

export default function RoundHeader({
  x,
  y = 0,
  width,
  roundHeader,
  canvasPadding,
  numOfRounds,
  tournamentRoundText,
  columnIndex,
}) {
  return (
    <g>
      <rect
        x={x}
        y={y + canvasPadding}
        width={width}
        height={roundHeader.height}
        fill={roundHeader.backgroundColor}
        rx="3"
        ry="3"
      />
      <text
        fontFamily={roundHeader.fontFamily}
        x={x + width / 2}
        y={y + canvasPadding + roundHeader.height / 2}
        style={{
          fontSize: `${roundHeader.fontSize}px`,
          color: roundHeader.fontColor,
        }}
        fill="currentColor"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {roundHeader.isCustomText ? tournamentRoundText : 
          (columnIndex + 1 === numOfRounds) ? 'Final' :
          (columnIndex + 1 === numOfRounds - 1) ? 'Semi-final' :
          (columnIndex + 1 < numOfRounds - 1) ? `Round ${tournamentRoundText}` : ''
        }
      </text>
    </g>
  );
}
