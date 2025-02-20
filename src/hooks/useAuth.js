import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { authRequest } from '@/store/auth/authSlice';

const useAuth = () => {
  const username = useSelector(state => state.auth.username);
  const img = useSelector(state => state.auth.img);
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(authRequest());
    }
  }, [token, dispatch]);

  return { username, img };
};

export default useAuth;
