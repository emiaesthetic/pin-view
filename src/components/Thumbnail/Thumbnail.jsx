import PropTypes from 'prop-types';

import { ReactComponent as FavoriteIcon } from './img/favorite.svg';
import style from './Thumbnail.module.css';

import Button from '@/components/Button';

export const Thumbnail = ({ thumb, description, liked }) => (
  <div className={style.thumbnail}>
    <a className={style.link} href="#photo">
      <img
        className={style.img}
        src={thumb}
        width="300"
        height="300"
        loading="lazy"
        alt={description}
      />
    </a>

    <Button
      kind="buttonFavorite"
      color={liked ? 'favorite' : 'light'}
      aria-label="Add to favorites"
    >
      <FavoriteIcon className={style.icon} aria-hidden="true" />
    </Button>
  </div>
);

Thumbnail.propTypes = {
  thumb: PropTypes.string,
  description: PropTypes.string,
  liked: PropTypes.bool,
};
