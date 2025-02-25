import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ReactComponent as FavoriteIcon } from './img/favorite.svg';
import style from './Thumbnail.module.css';

import Button from '@/components/Button';

export const Thumbnail = ({ id, thumb, description, liked, onLike }) => (
  <div className={style.thumbnail}>
    <Link className={style.link} to={`/photo/${id}`}>
      <img
        className={style.img}
        src={thumb}
        width="300"
        height="300"
        loading="lazy"
        alt={description}
      />
    </Link>

    <Button
      kind="buttonFavorite"
      color={liked ? 'favorite' : 'light'}
      aria-label="Add to favorites"
      onClick={onLike}
    >
      <FavoriteIcon className={style.icon} aria-hidden="true" />
    </Button>
  </div>
);

Thumbnail.propTypes = {
  id: PropTypes.string,
  thumb: PropTypes.string,
  description: PropTypes.string,
  liked: PropTypes.bool,
  onLike: PropTypes.func,
};
