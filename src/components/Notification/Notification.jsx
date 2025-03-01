import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { ReactComponent as CloseIcon } from './img/close.svg';
import { ReactComponent as ErrorIcon } from './img/error.svg';
import { ReactComponent as NeutralIcon } from './img/neutral.svg';
import style from './Notification.module.css';

import Button from '@/components/Button';

const notificationList = {
  error: { title: 'Error toast', Icon: ErrorIcon },
  neutral: { title: 'Neutral toast', Icon: NeutralIcon },
};

export const Notification = ({ type, position, message }) => {
  const [isShow, setIsShow] = useState(false);
  const { title, Icon } = notificationList[type];

  useEffect(() => {
    if (message) {
      setIsShow(true);

      const timer = setTimeout(() => {
        setIsShow(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isShow || !message) return null;

  return ReactDOM.createPortal(
    <div className={`${style.notification} ${style[type]} ${style[position]}`}>
      <div className={style.iconWrapper}>
        <Icon className={style.icon} aria-hidden="true" />
      </div>

      <div className={style.content}>
        <h3 className={style.title}>{title}</h3>
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

Notification.propTypes = {
  type: PropTypes.string,
  position: PropTypes.string,
  message: PropTypes.string,
};
