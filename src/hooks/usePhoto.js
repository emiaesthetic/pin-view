import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { photoRequest } from '@/store/photo/photoSlice';

const usePhoto = photoID => {
  const { photo: photoData } = useSelector(state => state.photo);
  const { id, photo, user } = photoData;
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(photoRequest(photoID));
  }, [photoID, token, dispatch]);

  return { id, photo, user };
};

export default usePhoto;
