import style from './Header.module.css';

import Auth from '@/components/Auth';
import Logo from '@/components/Logo';
import Layout from '@/layouts/Layout';

export const Header = () => (
  <header className={style.header}>
    <Layout>
      <div className={style.content}>
        <Logo />
        <Auth />
      </div>
    </Layout>
  </header>
);
