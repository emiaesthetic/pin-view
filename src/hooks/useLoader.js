import { useState, useEffect } from 'react';

const useLoader = isLoading => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return { showLoader };
};

export default useLoader;
