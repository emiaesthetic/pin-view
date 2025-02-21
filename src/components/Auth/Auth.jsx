import { useState } from 'react';

import style from './Auth.module.css';
import { ReactComponent as LoginIcon } from './img/login.svg';

import UserMenu from '@/components/Auth/UserMenu';
import Button from '@/components/Button';
import Error from '@/components/Error';
import authUrl from '@/config/authConfig';
import useAuth from '@/hooks/useAuth';

export const Auth = () => {
  const { user, error, clearAuth } = useAuth();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleLogout = () => {
    setMenuIsOpen(false);
    clearAuth();
  };

  const renderContent = () => {
    if (user) {
      return (
        <>
          <Button
            kind="buttonIcon"
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
        <LoginIcon aria-hidden="true" />
      </a>
    );
  };

  return (
    <div className={style.auth}>
      {renderContent()}
      <Error message={error} />
    </div>
  );
};
