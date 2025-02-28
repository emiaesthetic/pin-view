import { ReactComponent as LogoIcon } from './img/logo.svg';
import style from './Logo.module.css';

export const Logo = () => (
  <a className={style.logo} href="/" aria-label="Logo Pin View">
    <LogoIcon className={style.icon} aria-hidden="true" />
  </a>
);
