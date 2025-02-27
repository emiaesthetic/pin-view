import PropTypes from 'prop-types';

import { ReactComponent as FavoriteIcon } from './img/favorite.svg';
import style from './PinButtonsGroup.module.css';

import Button from '@/components/Button';

export const PinButtonsGroup = ({
  id,
  full,
  likes,
  liked,
  onLike,
  onDownload,
}) => (
  <div className={style.buttonsGroup}>
    <div className={style.favorite}>
      <Button
        kind="icon"
        color={liked ? 'accent' : 'alphaBG'}
        aria-label="Add to favorites"
        onClick={() => onLike(id, liked, likes)}
      >
        <FavoriteIcon aria-hidden="true" />
      </Button>
      <span>{likes}</span>
    </div>
    <Button kind="text" color="accentBG" onClick={() => onDownload(full)}>
      Download
    </Button>
  </div>
);

PinButtonsGroup.propTypes = {
  id: PropTypes.string,
  full: PropTypes.string,
  likes: PropTypes.number,
  liked: PropTypes.bool,
  onLike: PropTypes.func,
  onDownload: PropTypes.func,
};
