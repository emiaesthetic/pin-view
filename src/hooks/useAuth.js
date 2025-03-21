import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authRequest, authLogout } from '@/store/auth/authSlice';
import { resetGallery } from '@/store/gallery/gallerySlice';
import { resetPin } from '@/store/pin/pinSlice';
import { clearToken } from '@/store/token/tokenSlice';

const useAuth = () => {
  const [globalLoading, setGlobalLoading] = useState(false);

  const {
    user,
    error: authError,
    loading: authLoading,
  } = useSelector(state => state.auth);
  const {
    token,
    error: tokenError,
    loading: tokenLoading,
  } = useSelector(state => state.token);

  const error = tokenError || authError || null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenLoading) {
      setGlobalLoading(true);
    } else if (token) {
      dispatch(authRequest());
    }
  }, [tokenLoading, token, dispatch]);

  useEffect(() => {
    if (user && !authLoading) {
      setGlobalLoading(false);
    } else if (error) {
      dispatch(clearToken());
      setGlobalLoading(false);
    }
  }, [user, error, authLoading, dispatch]);

  const clearAuth = () => {
    navigate('/');

    dispatch(resetPin());
    dispatch(resetGallery());
    dispatch(clearToken());
    dispatch(authLogout());
  };

  return { user, error, loading: globalLoading, clearAuth };
};

export default useAuth;
