import { useState, useEffect, useLayoutEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Auth from './Auth';
import style from './Header.module.css';
import Logo from './Logo';
import Search from './Search';

import Layout from '@/components/Layout';
import { useHeaderHeight } from '@/context/HeaderHeightContext';
import { tokenRequest } from '@/store/token/tokenSlice';
import debounceRaf from '@/utils/debounce';

export const Header = () => {
  const [search, setSearch] = useState('');
  const { setHeaderHeight } = useHeaderHeight();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const headerRef = useRef(null);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      dispatch(tokenRequest(code));
      navigate('/');
    }
  }, [searchParams, navigate, dispatch]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    const debounceResize = debounceRaf(handleResize);
    debounceResize();
    window.addEventListener('resize', debounceResize);

    return () => window.removeEventListener('resize', debounceResize);
  }, [setHeaderHeight]);

  return (
    <header className={style.header} ref={headerRef}>
      <Layout>
        <div className={style.content}>
          <Logo />
          <Search search={search} setSearch={setSearch} />
          <Auth clearSearch={() => setSearch('')} />
        </div>
      </Layout>
    </header>
  );
};
