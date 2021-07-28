import React from 'react';

export default function RoundHeader(props) {
  return (
    <g>
      <rect
        x={props.x}
        y={props.canvasPadding}
        width={props.width}
        height={props.roundHeader.height}
        fill={props.roundHeader.backgroundColor}
        rx="3"
        ry="3"
      />
      <text
        fontFamily={props.roundHeader.fontFamily}
        x={props.x + props.width / 2}
        y={props.canvasPadding + props.roundHeader.height / 2}
        style={{
          fontSize: `${props.roundHeader.fontSize}px`,
          color: props.roundHeader.fontColor,
        }}
        fill="currentColor"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {props.columnIndex + 1 === props.columns.length && 'Final'}
        {props.columnIndex + 1 === props.columns.length - 1 && 'Semi-final'}
        {props.columnIndex + 1 < props.columns.length - 1 &&
          `Round ${props.tournamentRoundText}`}
      </text>
    </g>
  );
}
