import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import style from './Header.module.css';

import Auth from '@/components/Auth';
import Logo from '@/components/Logo';
import Layout from '@/layouts/Layout';
import { tokenRequest } from '@/store/token/tokenSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      dispatch(tokenRequest(code));
      navigate('/');
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <>
      <header className={style.header}>
        <Layout>
          <div className={style.content}>
            <Logo />
            <Auth />
          </div>
        </Layout>
      </header>
      <Outlet />
    </>
  );
};
