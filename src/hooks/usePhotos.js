import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { photosRequest } from '@/store/photos/photosSlice';

const usePhotos = () => {
  const { data, error, loading, currentPage, totalPages } = useSelector(
    state => state.photos,
  );
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(photosRequest());
  }, [token, dispatch]);

  return { data, error, loading, currentPage, totalPages };
};

export default usePhotos;
