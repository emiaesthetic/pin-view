import { useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import {
  photosRequest,
  searchRequest,
  resetGallery,
} from '@/store/gallery/gallerySlice';

const useGallery = () => {
  const { data, error, loading, currentPage, totalPages } = useSelector(
    state => state.gallery,
  );
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();
  const { search } = useParams();
  const navigate = useNavigate();
  const prevTokenRef = useRef(token);

  useEffect(() => {
    if (prevTokenRef.current !== token) {
      dispatch(resetGallery());
      navigate('/');
      prevTokenRef.current = token;
    }
  }, [token, navigate, dispatch]);

  useEffect(() => {
    if (data.length !== 0 || error || loading) return;

    if (search !== undefined && search.trim() !== '') {
      dispatch(searchRequest(search));
    } else {
      dispatch(photosRequest());
    }
  }, [data, search, error, loading, dispatch]);

  return { data, error, loading, currentPage, totalPages };
};

export default useGallery;
