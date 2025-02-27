import { Routes, Route } from 'react-router-dom';

import style from './Main.module.css';

import Gallery from '@/components/Gallery';
import Pin from '@/components/Pin';
import ScrollProvider from '@/context/scrollContext';

export const Main = () => (
  <main className={style.main}>
    <ScrollProvider>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/photos/:search" element={<Gallery />} />
        <Route path="/photo/:id" element={<Pin />} />
      </Routes>
    </ScrollProvider>
  </main>
);
