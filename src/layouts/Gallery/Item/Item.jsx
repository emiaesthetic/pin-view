import PropTypes from 'prop-types';

import style from './Item.module.css';

import Creator from '@/components/Creator';
import Thumbnail from '@/components/Thumbnail';

export const Item = ({ id, photo, user, onLike }) => (
  <div className={style.item} role="listitem">
    <Thumbnail id={id} {...photo} onLike={onLike} />
    <Creator {...user} />
  </div>
);

Item.propTypes = {
  id: PropTypes.string,
  photo: PropTypes.object,
  user: PropTypes.object,
  onLike: PropTypes.func,
};
