import PropTypes from 'prop-types';

import ComeBack from './ComeBack';
import style from './PinImage.module.css';

export const PinImage = ({ img, description, color = '#fff', onComeBack }) => (
  <div className={style.wrapper} style={{ backgroundColor: color }}>
    <img className={style.img} src={img} alt={description} />
    <ComeBack onClick={onComeBack} />
  </div>
);

PinImage.propTypes = {
  img: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string,
  onComeBack: PropTypes.func,
};
