import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { authRequest, authLogout } from '@/store/auth/authSlice';
import { clearToken } from '@/store/token/tokenSlice';

const useAuth = () => {
  const { user, error: authError } = useSelector(state => state.auth);
  const { token, error: tokenError } = useSelector(state => state.token);
  const error = tokenError || authError || null;
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(clearToken());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(authRequest());
    }
  }, [token, dispatch]);

  const clearAuth = () => {
    dispatch(clearToken());
    dispatch(authLogout());
  };

  return { user, error, clearAuth };
};

export default useAuth;
