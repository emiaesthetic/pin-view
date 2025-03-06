import { useEffect, useState, useRef } from 'react';

import PropTypes from 'prop-types';

import style from './Auth.module.css';
import UserMenu from './UserMenu';

import { ReactComponent as LoginIcon } from '@/assets/img/login.svg';
import Button from '@/components/Button';
import Notification from '@/components/Notification';
import Preloader from '@/components/Preloader';
import useAuth from '@/hooks/useAuth';
import useLoader from '@/hooks/useLoader';
import authUrl from '@/services/authConfig';

export const Auth = ({ clearSearch }) => {
  const { user, error, loading, clearAuth } = useAuth();
  const { showLoader } = useLoader(loading);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleLogout = () => {
    clearSearch();
    clearAuth();
    setMenuIsOpen(false);
  };

  const handleClick = ({ target }) => {
    if (
      menuIsOpen &&
      menuRef.current &&
      !menuRef.current.contains(target) &&
      buttonRef.current &&
      !buttonRef.current.contains(target)
    ) {
      setMenuIsOpen(false);
    }
  };

  const handleEscape = ({ key }) => {
    if (menuIsOpen && key === 'Escape') {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const renderContent = () => {
    if (user) {
      return (
        <>
          <Button
            ref={buttonRef}
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
          {menuIsOpen && (
            <UserMenu ref={menuRef} user={user} onLogout={handleLogout} />
          )}
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
    <>
      {showLoader && <Preloader />}
      <div className={style.auth}>
        {renderContent()}
        <Notification type="error" position="topRight" message={error} />
      </div>
    </>
  );
};

Auth.propTypes = {
  clearSearch: PropTypes.func,
};
