import PropTypes from 'prop-types';

import style from './PinImage.module.css';

export const PinImage = ({ img, description, color = '#fff' }) => (
  <div className={style.wrapper} style={{ backgroundColor: color }}>
    <img className={style.img} src={img} alt={description} />
  </div>
);

PinImage.propTypes = {
  img: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string,
};
