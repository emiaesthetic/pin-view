import { forwardRef, useEffect } from 'react';

import PropTypes from 'prop-types';

import style from './UserMenu.module.css';

import { ReactComponent as LogoutIcon } from '@/assets/img/logout.svg';
import Button from '@/components/Button';

export const UserMenu = forwardRef(({ user, onLogout }, ref) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  return (
    <div className={style.menu} ref={ref}>
      <div className={style.description}>
        <img
          className={style.img}
          src={user.img}
          alt={`Profile photo of ${user.username}`}
        />
        <div className={style.info}>
          <a
            className={style.link}
            href={user.link}
            target="_blank"
            rel="noreferrer"
          >
            {user.username}
          </a>
          <span className={style.email}>{user.email}</span>
        </div>
      </div>
      <Button kind="icon" aria-label="Log out" onClick={onLogout}>
        <LogoutIcon aria-hidden="true" />
      </Button>
    </div>
  );
});

UserMenu.displayName = 'UserMenu';

UserMenu.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
};
