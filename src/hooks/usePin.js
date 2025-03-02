import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { pinRequest } from '@/store/pin/pinSlice';

const usePin = () => {
  const { pinID } = useParams();

  const { pin, error, loading } = useSelector(state => state.pin);
  const { id, photo, user } = pin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (pinID) {
      dispatch(pinRequest(pinID));
    }
  }, [pinID, dispatch]);

  return { id, photo, user, error, loading };
};

export default usePin;
