import style from './Auth.module.css';

import authUrl from '@/services/auth';

export const Auth = () => (
  <a className={style.auth} href={authUrl}>
    Log in
  </a>
);
