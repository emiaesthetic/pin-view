import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import style from './Error.module.css';
import { ReactComponent as CloseIcon } from './img/close.svg';
import { ReactComponent as ErrorIcon } from './img/error.svg';

import Button from '@/components/Button';

export const Error = ({ message }) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (message) {
      setIsShow(true);

      const timer = setTimeout(() => {
        setIsShow(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isShow || !message) return null;

  return ReactDOM.createPortal(
    <div className={style.error}>
      <div className={style.iconWrapper}>
        <ErrorIcon className={style.icon} aria-hidden="true" />
      </div>

      <div className={style.content}>
        <h3 className={style.title}>Error toast</h3>
        <p className={style.message}>{message}</p>
      </div>

      <Button
        kind="icon"
        aria-label="Close error"
        onClick={() => setIsShow(false)}
      >
        <CloseIcon className={style.closeIcon} aria-hidden="true" />
      </Button>
    </div>,
    document.getElementById('portal'),
  );
};

Error.propTypes = {
  message: PropTypes.string,
};
