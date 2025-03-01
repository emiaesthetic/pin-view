import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { pinRequest } from '@/store/pin/pinSlice';

const usePin = pinID => {
  const { id, photo, user } = useSelector(state => state.pin.pin);
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pinID) {
      dispatch(pinRequest(pinID));
    }
  }, [pinID, token, dispatch]);

  return { id, photo, user };
};

export default usePin;
