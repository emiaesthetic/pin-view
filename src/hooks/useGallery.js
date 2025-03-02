import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { photosRequest, searchRequest } from '@/store/gallery/gallerySlice';

const useGallery = () => {
  const { search } = useParams();

  const {
    data,
    error,
    loading,
    currentPage,
    totalPages,
    isCompleted,
    isSearchCleared,
  } = useSelector(state => state.gallery);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loading || error || isCompleted) return;

    if (search !== undefined && search.trim() !== '' && !isSearchCleared) {
      dispatch(searchRequest(search));
    } else {
      dispatch(photosRequest());
    }
  }, [search, error, loading, isCompleted, isSearchCleared, dispatch]);

  return {
    data,
    error,
    loading,
    totalPages,
    currentPage,
    isCompleted,
  };
};

export default useGallery;
