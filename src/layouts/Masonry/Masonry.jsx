import { useDispatch } from 'react-redux';

import Item from './Item';
import style from './Masonry.module.css';

import Error from '@/components/Error';
import InfinityScroll from '@/components/InfinityScroll';
import Preloader from '@/components/Preloader';
import usePhotos from '@/hooks/usePhotos';
import { photosRequest } from '@/store/photos/photosSlice';

export const Masonry = () => {
  const { data, error, loading, currentPage, totalPages } = usePhotos();
  const dispatch = useDispatch();

  const loadMore = () => {
    if (currentPage <= totalPages) {
      dispatch(photosRequest());
    }
  };

  if (loading) return <Preloader type="full" />;

  if (error) return <Error message={error} />;

  if (!data.length) return null;

  return (
    <InfinityScroll
      loadMore={loadMore}
      hasMore={currentPage < totalPages}
      isLoading={loading}
    >
      <ul className={style.masonry}>
        {data.map(photoData => (
          <Item key={photoData.id} {...photoData} />
        ))}
      </ul>
    </InfinityScroll>
  );
};
