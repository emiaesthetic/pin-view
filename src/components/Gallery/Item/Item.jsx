import PropTypes from 'prop-types';

import style from './Item.module.css';
import Thumbnail from './Thumbnail';

import Creator from '@/components/Creator';

export const Item = ({ id, photo, user, onLike, onPhoto }) => (
  <div className={style.item} role="listitem">
    <Thumbnail id={id} {...photo} onLike={onLike} onPhoto={onPhoto} />
    <Creator {...user} />
  </div>
);

Item.propTypes = {
  id: PropTypes.string,
  photo: PropTypes.object,
  user: PropTypes.object,
  onLike: PropTypes.func,
  onPhoto: PropTypes.func,
};
