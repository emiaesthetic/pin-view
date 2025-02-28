import { useEffect, useRef } from 'react';

import Masonry from 'react-masonry-css';
import { useDispatch } from 'react-redux';

import style from './Gallery.module.css';
import Item from './Item';

import Error from '@/components/Error';
import Layout from '@/components/Layout';
import { useScroll } from '@/context/ScrollContext';
import useLike from '@/hooks/useLike';
import usePhotos from '@/hooks/usePhotos';
import { photosRequest } from '@/store/photos/photosSlice';

const breakpointColumnsObj = {
  default: 5,
  1024: 4,
  768: 3,
  480: 2,
};

export const Gallery = () => {
  const { data, error, currentPage, totalPages } = usePhotos();
  const { scrollPosition, setScrollPosition } = useScroll();
  const { handleLike } = useLike();
  const dispatch = useDispatch();
  const triggerRef = useRef();

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  const handleOpenPhoto = () => {
    setScrollPosition(window.scrollY);
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
    <Layout>
      <h1 className="visually-hidden">
        Pin View: Your Personal Unsplash Gallery
      </h1>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={style.masonry}
        columnClassName={style.column}
        role="list"
      >
        {data.map(photoData => (
          <Item
            key={photoData.id}
            {...photoData}
            onLike={() =>
              handleLike(
                photoData.id,
                photoData.photo.liked,
                photoData.photo.likes,
              )
            }
            onPhoto={handleOpenPhoto}
          />
        ))}

        {currentPage < totalPages && <div ref={triggerRef}></div>}
      </Masonry>
    </Layout>
  );
};
