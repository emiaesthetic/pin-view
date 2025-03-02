import PropTypes from 'prop-types';

import style from './PinButtonsGroup.module.css';

import { ReactComponent as FavoriteIcon } from '@/assets/img/favorite.svg';
import Button from '@/components/Button';

export const PinButtonsGroup = ({ likes, liked, onLike, onDownload }) => (
  <div className={style.buttonsGroup}>
    <div className={style.favorite}>
      <Button
        kind="icon"
        color={liked ? 'accent' : 'alphaBG'}
        aria-label="Add to favorites"
        onClick={onLike}
      >
        <FavoriteIcon aria-hidden="true" />
      </Button>
      <span>{likes}</span>
    </div>
    <Button kind="text" color="accentBG" onClick={onDownload}>
      Download
    </Button>
  </div>
);

PinButtonsGroup.propTypes = {
  likes: PropTypes.number,
  liked: PropTypes.bool,
  onLike: PropTypes.func,
  onDownload: PropTypes.func,
};
