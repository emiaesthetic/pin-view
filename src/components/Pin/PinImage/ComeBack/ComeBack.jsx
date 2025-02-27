import PropTypes from 'prop-types';

import style from './ComeBack.module.css';
import { ReactComponent as ArrowIcon } from './img/arrow.svg';

import Button from '@/components/Button';

export const ComeBack = ({ onClick }) => (
  <Button kind="comeBack" color="light" aria-label="Go back" onClick={onClick}>
    <ArrowIcon className={style.icon} aria-hidden="true" />
  </Button>
);

ComeBack.propTypes = {
  onClick: PropTypes.func,
};
