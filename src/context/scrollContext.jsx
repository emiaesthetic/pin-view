import { createContext, useContext, useState } from 'react';

import PropTypes from 'prop-types';

const ScrollContext = createContext();

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <ScrollContext.Provider value={{ scrollPosition, setScrollPosition }}>
      {children}
    </ScrollContext.Provider>
  );
};

ScrollProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};
