import PropTypes from 'prop-types';

import style from './Button.module.css';

export const Button = ({ children, kind, color, ...props }) => {
  const buttonClass = `${style.button} ${style[kind]} ${color ? style[color] : ''}`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  kind: PropTypes.string,
  color: PropTypes.string,
};
