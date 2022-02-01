import { useEffect, useState } from 'react';

const debounce = (fn, delay) => {
  let timer;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
};

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
