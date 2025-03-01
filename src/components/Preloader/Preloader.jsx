import { ReactComponent as LogoIcon } from './img/logo.svg';
import style from './Preloader.module.css';

export const Preloader = () => (
  <div className={style.preloader} id="preloader">
    <LogoIcon className={style.icon} aria-label="Pin View Logo" />
  </div>
);
