import style from './Main.module.css';

import Layout from '@/layouts/Layout';
import Masonry from '@/layouts/Masonry';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Masonry />
    </Layout>
  </main>
);
