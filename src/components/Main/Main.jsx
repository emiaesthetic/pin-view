import { Outlet } from 'react-router-dom';

import style from './Main.module.css';

export const Main = () => (
  <main className={style.main}>
    <Outlet />
  </main>
);
