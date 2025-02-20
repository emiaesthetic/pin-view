import Button from '../Button';

import style from './Auth.module.css';

import authUrl from '@/config/authConfig';
import useAuth from '@/hooks/useAuth';

export const Auth = () => {
  const { username, img } = useAuth();

  if (username && img) {
    return (
      <Button type="button" title={username}>
        <img
          className={style.img}
          src={img}
          alt={`Profile photo of ${username}`}
        />
      </Button>
    );
  }

  return (
    <a className={style.auth} href={authUrl}>
      Log in
    </a>
  );
};
