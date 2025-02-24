import PropTypes from 'prop-types';

import style from './Item.module.css';

import Creator from '@/components/Creator';
import Thumbnail from '@/components/Thumbnail';

export const Item = ({ photo, user }) => (
  <div className={style.item} role="listitem">
    <Thumbnail {...photo} />
    <Creator {...user} />
  </div>
);

Item.propTypes = {
  photo: PropTypes.object,
  user: PropTypes.object,
};
