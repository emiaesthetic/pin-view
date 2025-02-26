import { createContext, useState } from 'react';

import PropTypes from 'prop-types';

export const headerHeightContext = createContext();

const HeaderHeightProvider = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <headerHeightContext.Provider value={{ headerHeight, setHeaderHeight }}>
      {children}
    </headerHeightContext.Provider>
  );
};

HeaderHeightProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default HeaderHeightProvider;
