import PropTypes from 'prop-types';

import style from './Item.module.css';

import Creator from '@/components/Creator';
import Thumbnail from '@/components/Thumbnail';

export const Item = ({ photo, user }) => (
  <li className={style.item}>
    <Thumbnail {...photo} />
    <Creator {...user} />
  </li>
);

Item.propTypes = {
  photo: PropTypes.object,
  user: PropTypes.object,
};
