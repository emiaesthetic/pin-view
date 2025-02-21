import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { authRequest, authLogout } from '@/store/auth/authSlice';
import { clearToken } from '@/store/token/tokenSlice';

const useAuth = () => {
  const { user, error } = useSelector(state => state.auth);
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

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
