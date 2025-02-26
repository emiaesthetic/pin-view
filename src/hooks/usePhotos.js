import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  photosRequest,
  searchRequest,
  resetPhotos,
} from '@/store/photos/photosSlice';

const usePhotos = () => {
  const { data, error, loading, currentPage, totalPages } = useSelector(
    state => state.photos,
  );
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();
  const { search } = useParams();

  useEffect(() => {
    if (search !== undefined && search.trim() !== '') {
      dispatch(searchRequest(search));
    } else {
      dispatch(photosRequest());
    }
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(resetPhotos());
  }, [token, dispatch]);

  return { data, error, loading, currentPage, totalPages };
};

export default usePhotos;
