import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { photoRequest } from '@/store/photo/photoSlice';

const usePhoto = photoID => {
  const { photo } = useSelector(state => state.photo);
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(photoRequest(photoID));
  }, [photoID, token, dispatch]);

  return { photoData: photo };
};

export default usePhoto;
