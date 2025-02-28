import { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Auth from './Auth';
import style from './Header.module.css';
import Logo from './Logo';
import Search from './Search';

import Layout from '@/components/Layout';
import { useHeaderHeight } from '@/context/HeaderHeightContext';
import { tokenRequest } from '@/store/token/tokenSlice';

export const Header = () => {
  const [searchParams] = useSearchParams();
  const { setHeaderHeight } = useHeaderHeight();
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <header className={style.header} ref={headerRef}>
      <Layout>
        <div className={style.content}>
          <Logo />
          <Search />
          <Auth />
        </div>
      </Layout>
    </header>
  );
};
