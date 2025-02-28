import { createContext, useState, useContext } from 'react';

import PropTypes from 'prop-types';

const HeaderHeightContext = createContext();

export const useHeaderHeight = () => useContext(HeaderHeightContext);

export const HeaderHeightProvider = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <HeaderHeightContext.Provider value={{ headerHeight, setHeaderHeight }}>
      {children}
    </HeaderHeightContext.Provider>
  );
};

HeaderHeightProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};
