import style from './Logo.module.css';

import { ReactComponent as LogoIcon } from '@/assets/img/logo.svg';

export const Logo = () => (
  <a className={style.logo} href="/" aria-label="Logo Pin View">
    <LogoIcon className={style.icon} aria-hidden="true" />
  </a>
);
