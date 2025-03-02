import { useState } from 'react';

import PropTypes from 'prop-types';

import style from './Auth.module.css';
import UserMenu from './UserMenu';

import { ReactComponent as LoginIcon } from '@/assets/img/login.svg';
import Button from '@/components/Button';
import Notification from '@/components/Notification';
import useAuth from '@/hooks/useAuth';
import authUrl from '@/services/authConfig';

export const Auth = ({ clearSearch }) => {
  const { user, error, clearAuth } = useAuth();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleLogout = () => {
    clearSearch();
    clearAuth();
    setMenuIsOpen(false);
  };

  const renderContent = () => {
    if (user) {
      return (
        <>
          <Button
            kind="icon"
            title={user.username}
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            <img
              className={style.img}
              src={user.img}
              alt={`Profile photo of ${user.username}`}
            />
          </Button>
          {menuIsOpen && <UserMenu user={user} onLogout={handleLogout} />}
        </>
      );
    }

    return (
      <a
        className={style.login}
        href={authUrl}
        aria-label="User Authentication"
      >
        <LoginIcon className={style.icon} aria-hidden="true" />
      </a>
    );
  };

  return (
    <div className={style.auth}>
      {renderContent()}
      <Notification type="error" position="topRight" message={error} />
    </div>
  );
};

Auth.propTypes = {
  clearSearch: PropTypes.func,
};
