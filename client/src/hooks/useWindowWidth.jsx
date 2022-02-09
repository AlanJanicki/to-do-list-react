import { useEffect, useState } from 'react';

import { debounce } from '../utils/debounce';

const useWindowWidth = () => {
  const [dimension, setDimension] = useState(window.innerWidth);

  useEffect(() => {
    const debouncedResizeHandler = debounce(() => {
      setDimension(window.innerWidth);
    }, 100);

    window.addEventListener('resize', debouncedResizeHandler);

    return () => window.removeEventListener('resize', debouncedResizeHandler);
  }, []);

  return dimension;
};

export default useWindowWidth;
