import { useEffect, useRef } from 'react';

import Masonry from 'react-masonry-css';
import { useDispatch } from 'react-redux';

import style from './Gallery.module.css';
import Item from './Item';

import Layout from '@/components/Layout';
import Notification from '@/components/Notification';
import useGallery from '@/hooks/useGallery';
import useLike from '@/hooks/useLike';
import { useScroll } from '@/providers/scroll';
import { photosRequest } from '@/store/gallery/gallerySlice';

export const Gallery = () => {
  const { data, error, currentPage, totalPages, isCompleted } = useGallery();
  const { likeError, handleLike } = useLike();
  const { scrollPosition, setScrollPosition } = useScroll();

  const triggerRef = useRef();
  const dispatch = useDispatch();

  const breakpointColumnsObj = {
    default: 5,
    1024: 4,
    768: 3,
    480: 2,
  };

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

  useEffect(() => {
    document.title = 'Pin View';
  }, []);

  if (isCompleted && error) {
    return <Notification type="error" position="topRight" message={error} />;
  }

  if (isCompleted && !data.length) {
    return (
      <Notification
        type="neutral"
        position="topRight"
        message="I can't find anything... I'm sorry."
      />
    );
  }

  if (isCompleted && data.length) {
    return (
      <>
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
            {data.map(pin => (
              <Item
                key={pin.id}
                {...pin}
                onLike={() => handleLike(pin.id, pin.photo.liked)}
                onPhoto={handleOpenPhoto}
              />
            ))}

            {currentPage < totalPages && <div ref={triggerRef}></div>}
          </Masonry>
        </Layout>
        {likeError && (
          <Notification type="error" position="topRight" message={likeError} />
        )}
      </>
    );
  }
};
