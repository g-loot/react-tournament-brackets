import React, { useEffect, useState, useRef } from 'react';
import { INITIAL_VALUE, ReactSVGPanZoom, TOOL_AUTO } from 'react-svg-pan-zoom';
import { precisionRound } from 'Utils/numbers';

const SvgViewer = ({
  height = 500,
  width = 500,
  bracketWidth,
  bracketHeight,
  children,
  startAt = [0, 0],
  scaleFactor = 1.1,
  ...rest
}) => {
  const Viewer = useRef(null);
  const [tool, setTool] = useState(TOOL_AUTO);
  const [value, setValue] = useState(INITIAL_VALUE);
  const [scaleFactorMin, setScaleFactorMin] = useState(1);
  const scaleFactorMax = 1.25;

  useEffect(() => {
    Viewer.current.pan(...startAt);
  }, []);

  const lockToBoundaries = v => {
    const zoomFactor = v.a || v.d;
    const scaledMaxHeight = v.SVGHeight * zoomFactor - v.viewerHeight;
    const scaledMaxWidth = v.SVGWidth * zoomFactor - v.viewerWidth;

    const heightRatio = precisionRound(v.viewerHeight / v.SVGHeight, 2);
    const widthRatio = precisionRound(v.viewerWidth / v.SVGWidth, 2);
    setScaleFactorMin(Math.max(heightRatio, widthRatio));
    setValue({
      ...v,
      // eslint-disable-next-line no-nested-ternary
      e: v.e > 0 ? 0 : v.e < 0 - scaledMaxWidth ? 0 - scaledMaxWidth : v.e,
      // limit up/down panning to within the SVG
      // eslint-disable-next-line no-nested-ternary
      f: v.f > 0 ? 0 : v.f < 0 - scaledMaxHeight ? 0 - scaledMaxHeight : v.f,
    });
  };

  return (
    <ReactSVGPanZoom
      detectAutoPan={false}
      ref={Viewer}
      scaleFactor={scaleFactor}
      scaleFactorMax={scaleFactorMax}
      scaleFactorMin={scaleFactorMin}
      width={Math.min(width, bracketWidth)}
      height={Math.min(height, bracketHeight)}
      tool={tool}
      onChangeTool={setTool}
      value={value}
      onChangeValue={setValue}
      onZoom={lockToBoundaries}
      onPan={lockToBoundaries}
      miniatureProps={{ position: 'right' }}
      customToolbar={() => <></>}
      {...rest}
    >
      {children}
    </ReactSVGPanZoom>
  );
};
export default SvgViewer;
