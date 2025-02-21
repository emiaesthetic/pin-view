import PropTypes from 'prop-types';

import style from './Button.module.css';

export const Button = ({
  children,
  type = 'button',
  kind,
  color,
  ...props
}) => {
  const buttonClass = `${style.button} ${style[kind]} ${color ? style[color] : ''}`;

  return (
    <button className={buttonClass} type={type} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  kind: PropTypes.string,
  color: PropTypes.string,
};
