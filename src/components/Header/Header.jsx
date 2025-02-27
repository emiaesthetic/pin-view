import { useEffect, useContext, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import Auth from './Auth';
import style from './Header.module.css';
import Logo from './Logo';
import Search from './Search';

import Layout from '@/components/Layout';
import { headerHeightContext } from '@/context/headerHeight';
import { tokenRequest } from '@/store/token/tokenSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const headerRef = useRef(null);
  const { setHeaderHeight } = useContext(headerHeightContext);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      dispatch(tokenRequest(code));
      navigate('/');
    }
  }, [searchParams, navigate, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setHeaderHeight]);

  return (
    <>
      <header className={style.header} ref={headerRef}>
        <Layout>
          <div className={style.content}>
            <Logo />
            <Search />
            <Auth />
          </div>
        </Layout>
      </header>
      <Outlet />
    </>
  );
};
