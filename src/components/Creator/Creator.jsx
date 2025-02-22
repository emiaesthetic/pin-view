import PropTypes from 'prop-types';

import style from './Creator.module.css';

export const Creator = ({ username, link, img }) => (
  <div className={style.creator}>
    <img className={style.img} src={img} alt={`Profile photo of ${username}`} />
    <a className={style.link} href={link}>
      {username}
    </a>
  </div>
);

Creator.propTypes = {
  username: PropTypes.string,
  link: PropTypes.string,
  img: PropTypes.string,
};
