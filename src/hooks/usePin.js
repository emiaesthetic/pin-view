import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { pinRequest } from '@/store/pin/pinSlice';

const usePin = pinID => {
  const { id, photo, user } = useSelector(state => state.pin.pin);
  const error = useSelector(state => state.pin.error);
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pinID) {
      dispatch(pinRequest(pinID));
    }
  }, [pinID, token, dispatch]);

  return { id, photo, user, error };
};

export default usePin;
