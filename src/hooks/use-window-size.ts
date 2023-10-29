import { useState, useLayoutEffect, useEffect } from 'react';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * This only works if the window object exists otherwise it returns [0, 0]
 * @returns [width, height]
 */
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useIsomorphicLayoutEffect(() => {
    if (typeof global.window === 'undefined') return;
    function updateSize() {
      setSize([global.window.innerWidth, window.innerHeight]);
    }
    global.window.addEventListener('resize', updateSize);
    updateSize();
    return () => global.window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default useWindowSize;
