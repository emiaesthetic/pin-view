import PropTypes from 'prop-types';

import style from './Button.module.css';

export const Button = ({ children, modifier, type, ariaLabel, onClick }) => {
  const buttonClass = `${style.button} ${modifier ? style[modifier] : ''}`;

  return (
    <button
      className={buttonClass}
      type={type ? type : 'button'}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  modifier: PropTypes.string,
  type: PropTypes.string,
  ariaLabel: PropTypes.string,
  onClick: PropTypes.func,
};
