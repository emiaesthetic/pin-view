import style from './Preloader.module.css';

import { ReactComponent as LogoIcon } from '@/assets/img/logo.svg';

export const Preloader = () => (
  <div className={style.preloader} id="preloader">
    <LogoIcon className={style.icon} aria-label="Pin View Logo" />
  </div>
);
