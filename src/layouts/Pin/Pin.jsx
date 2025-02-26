import { useContext, useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';

import CommentForm from './CommentForm';
import Image from './Image';
import { ReactComponent as FavoriteIcon } from './img/favorite.svg';
import style from './Pin.module.css';

import Button from '@/components/Button';
import Creator from '@/components/Creator';
import { headerHeightContext } from '@/context/headerHeight';
import useLike from '@/hooks/useLike';
import usePhoto from '@/hooks/usePhoto';
import Layout from '@/layouts/Layout';
import formatDate from '@/utils/formatDate';

const downloadImage = async path => {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error('Failed to download image');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
};

export const Pin = () => {
  const { id } = useParams();
  const { photoData } = usePhoto(id);
  const { handleLike } = useLike();

  const contentRef = useRef(null);
  const { headerHeight } = useContext(headerHeightContext);

  useEffect(() => {
    const adjustHeight = () => {
      const content = contentRef.current;
      if (!content) return;

      const root = document.querySelector(':root');
      const padding =
        getComputedStyle(root).getPropertyValue('--padding-layout');

      if (window.innerWidth > 768) {
        content.style.maxHeight = `calc(100vh - ${headerHeight}px - ${padding} * 2)`;
      } else {
        content.style.maxHeight = 'unset';
      }
    };

    adjustHeight();
    window.addEventListener('resize', adjustHeight);

    return () => window.removeEventListener('resize', adjustHeight);
  }, [headerHeight]);

  return (
    <article className={style.pin}>
      <Layout>
        <h1 className="visually-hidden">Pin</h1>

        <div className={style.content} ref={contentRef}>
          <div className={style.leftColumn}>
            <Image
              src={photoData?.photo?.regular}
              alt={photoData?.photo?.description}
              style={{ backgroundColor: photoData?.photo?.color }}
            />
          </div>

          <div className={style.rightColumn}>
            <div className={style.buttonsGroup}>
              <div className={style.favorite}>
                <Button
                  kind="buttonIcon"
                  color={photoData?.photo?.liked ? 'favorite' : 'light'}
                  aria-label="Add to favorites"
                  onClick={() =>
                    handleLike(photoData?.id, photoData?.photo?.liked)
                  }
                >
                  <FavoriteIcon aria-hidden="true" />
                </Button>
                <span>{photoData?.photo?.likes}</span>
              </div>
              <Button
                kind="buttonText"
                color="accent"
                onClick={() => downloadImage(photoData?.photo?.full)}
              >
                Download
              </Button>
            </div>

            <div className={style.description}>
              <Creator {...photoData?.user} />
              <time dateTime={photoData?.photo?.published}>
                {formatDate(photoData?.photo?.published)}
              </time>
            </div>

            <div className={style.comments}></div>
            <CommentForm />
          </div>
        </div>
      </Layout>
    </article>
  );
};
