import style from './Main.module.css';

import Gallery from '@/layouts/Gallery';
import Layout from '@/layouts/Layout';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Gallery />
    </Layout>
  </main>
);
