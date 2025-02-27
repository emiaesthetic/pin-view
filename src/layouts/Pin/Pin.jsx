import { useContext, useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import style from './Pin.module.css';
import PinButtonsGroup from './PinButtonsGroup';
import { PinComments } from './PinComments/PinComments';
import PinDescription from './PinDescription';
import PinImage from './PinImage';

import { headerHeightContext } from '@/context/headerHeight';
import useLike from '@/hooks/useLike';
import usePhoto from '@/hooks/usePhoto';
import Layout from '@/layouts/Layout';

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
  const { id: photoID, photo, user } = usePhoto(id);
  const { handleLike } = useLike();
  const contentRef = useRef(null);
  const { headerHeight } = useContext(headerHeightContext);
  const navigate = useNavigate();
  const search = useSelector(state => state.photos.search);

  const handleComeBack = () => {
    navigate(`${search ? `/photos/${search}` : '/'}`);
  };

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
        <h1 className="visually-hidden">Pin: {photo?.description}</h1>

        <div className={style.content} ref={contentRef}>
          <div className={style.leftColumn}>
            <PinImage {...photo} onComeBack={handleComeBack} />
          </div>

          <div className={style.rightColumn}>
            <PinButtonsGroup
              id={photoID}
              onClick={handleLike}
              onDownload={downloadImage}
              {...photo}
            />
            <PinDescription user={user} published={photo?.published} />
            <PinComments />
          </div>
        </div>
      </Layout>
    </article>
  );
};
