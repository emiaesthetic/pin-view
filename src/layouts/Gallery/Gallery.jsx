import { useEffect, useRef } from 'react';

import Masonry from 'react-masonry-css';
import { useDispatch } from 'react-redux';

import style from './Gallery.module.css';
import Item from './Item';

import Error from '@/components/Error';
import usePhotos from '@/hooks/usePhotos';
import { photosRequest } from '@/store/photos/photosSlice';

export const Gallery = () => {
  const { data, error, currentPage, totalPages } = usePhotos();
  const dispatch = useDispatch();
  const triggerRef = useRef();

  const breakpointColumnsObj = {
    default: 5,
    1024: 4,
    768: 3,
    480: 2,
  };

  useEffect(() => {
    if (!triggerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          dispatch(photosRequest());
        }
      },
      {
        rootMargin: '100px',
      },
    );

    observer.observe(triggerRef.current);

    return () => observer.disconnect();
  }, [data.length, dispatch]);

  if (error) return <Error message={error} />;

  if (!data.length) return null;

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={style.masonry}
      columnClassName={style.column}
      role="list"
    >
      {data.map(photoData => (
        <Item key={photoData.id} {...photoData} />
      ))}

      {currentPage < totalPages && <div ref={triggerRef}></div>}
    </Masonry>
  );
};
