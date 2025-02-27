import { useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const prevTokenRef = useRef(token);

  useEffect(() => {
    if (prevTokenRef.current !== token) {
      dispatch(resetPhotos());
      navigate('/');
      prevTokenRef.current = token;
    }
  }, [token, navigate, dispatch]);

  useEffect(() => {
    if (search !== undefined && search.trim() !== '') {
      dispatch(searchRequest(search));
    }
  }, [search, dispatch]);

  useEffect(() => {
    if (data.length === 0 && !search) {
      dispatch(photosRequest());
    }
  }, [data, search, dispatch]);

  return { data, error, loading, currentPage, totalPages };
};

export default usePhotos;
