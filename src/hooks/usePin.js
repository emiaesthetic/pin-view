import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { pinRequest } from '@/store/pin/pinSlice';

const usePin = pinID => {
  const data = useSelector(state => state.gallery.data);
  const pin = useSelector(state => state.pin.pin);
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  const foundPin = data.find(pin => pin.id === pinID) || pin;
  const { id, photo, user } = foundPin;

  useEffect(() => {
    if (pinID) {
      dispatch(pinRequest(pinID));
    }
  }, [pinID, token, dispatch]);

  return { id, photo, user };
};

export default usePin;
