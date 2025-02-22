import PropTypes from 'prop-types';
import DotLoader from 'react-spinners/DotLoader';

import style from './Preloader.module.css';

export const Preloader = ({ type = 'local', size = 50 }) => (
  <div className={style[type]}>
    <DotLoader color="rgb(255 77 77)" size={size} />
  </div>
);

Preloader.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
};
