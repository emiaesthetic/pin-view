import { useLayoutEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import style from './Pin.module.css';
import PinButtonsGroup from './PinButtonsGroup';
import { PinComments } from './PinComments/PinComments';
import PinDescription from './PinDescription';
import PinImage from './PinImage';

import Layout from '@/components/Layout';
import { useHeaderHeight } from '@/context/HeaderHeightContext';
import useLike from '@/hooks/useLike';
import usePin from '@/hooks/usePin';

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
  const { pinID } = useParams();
  const { id, photo, user } = usePin(pinID);
  const { handleLike } = useLike();
  const { headerHeight } = useHeaderHeight();
  const contentRef = useRef(null);
  const search = useSelector(state => state.gallery.search);
  const navigate = useNavigate();

  const handleComeBack = () => {
    navigate(`${search ? `/photos/${search}` : '/'}`);
  };

  useLayoutEffect(() => {
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
        <h1 className="visually-hidden">Pin: {photo?.description}</h1>

        <div className={style.content} ref={contentRef}>
          <div className={style.leftColumn}>
            <PinImage {...photo} onComeBack={handleComeBack} />
          </div>

          <div className={style.rightColumn}>
            <PinButtonsGroup
              {...photo}
              onLike={() => handleLike(id, photo.liked, photo.likes)}
              onDownload={() => downloadImage(photo.full)}
            />
            <PinDescription user={user} published={photo?.published} />
            <PinComments />
          </div>
        </div>
      </Layout>
    </article>
  );
};
