import PropTypes from 'prop-types';

import style from './PinDescription.module.css';

import Creator from '@/components/Creator';
import formatDate from '@/utils/formatDate';

export const PinDescription = ({ user, published }) => (
  <div className={style.description}>
    <Creator {...user} />
    <time dateTime={published}>{formatDate(published)}</time>
  </div>
);

PinDescription.propTypes = {
  user: PropTypes.object,
  published: PropTypes.string,
};
