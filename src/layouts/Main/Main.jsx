import { Routes, Route } from 'react-router-dom';

import style from './Main.module.css';

import Gallery from '@/layouts/Gallery';
import Pin from '@/layouts/Pin';

export const Main = () => (
  <main className={style.main}>
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/photo/:id" element={<Pin />} />
    </Routes>
  </main>
);
