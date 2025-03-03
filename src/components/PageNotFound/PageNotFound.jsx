import { useEffect } from 'react';

import style from './PageNotFound.module.css';

import Layout from '@/components/Layout';

export const PageNotFound = () => {
  useEffect(() => {
    document.title = 'Page not found | Pin View';
  }, []);

  return (
    <div className={style.page}>
      <Layout>
        <div className={style.wrapper}>
          <h1 className={style.title}>Page not found</h1>
          <p className={style.subTitle}>
            Hmm, the page you were looking for doesn’t seem to exist anymore.
          </p>
          <a className={style.link} href="/">
            Back to Pin View
          </a>
        </div>
      </Layout>
    </div>
  );
};
