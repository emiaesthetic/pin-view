import PropTypes from 'prop-types';

import { ReactComponent as FavoriteIcon } from './img/favorite.svg';
import style from './PinButtonsGroup.module.css';

import Button from '@/components/Button';

export const PinButtonsGroup = ({
  id,
  full,
  likes,
  liked,
  onClick,
  onDownload,
}) => (
  <div className={style.buttonsGroup}>
    <div className={style.favorite}>
      <Button
        kind="buttonIcon"
        color={liked ? 'favorite' : 'light'}
        aria-label="Add to favorites"
        onClick={() => onClick(id, liked)}
      >
        <FavoriteIcon aria-hidden="true" />
      </Button>
      <span>{likes}</span>
    </div>
    <Button kind="buttonText" color="accent" onClick={() => onDownload(full)}>
      Download
    </Button>
  </div>
);

PinButtonsGroup.propTypes = {
  id: PropTypes.string,
  full: PropTypes.string,
  likes: PropTypes.number,
  liked: PropTypes.bool,
  onClick: PropTypes.func,
  onDownload: PropTypes.func,
};
