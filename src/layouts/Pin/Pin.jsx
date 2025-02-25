import { useParams } from 'react-router-dom';

import CommentForm from './CommentForm';
import Image from './Image';
import { ReactComponent as FavoriteIcon } from './img/favorite.svg';
import style from './Pin.module.css';

import Button from '@/components/Button';
import Creator from '@/components/Creator';
import useLike from '@/hooks/useLike';
import usePhoto from '@/hooks/usePhoto';
import Layout from '@/layouts/Layout';
import formatDate from '@/utils/formatDate';

export const Pin = () => {
  const { id } = useParams();
  const { photoData } = usePhoto(id);
  const { handleLike } = useLike();

  const handleDownload = async () => {
    try {
      const downloadUrl = `${photoData?.photo?.download}`;

      const response = await fetch(downloadUrl);
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
      console.error('Error:', error);
    }
  };

  return (
    <article className={style.pin}>
      <Layout>
        <h1 className="visually-hidden">Pin</h1>

        <div className={style.content}>
          <div className={style.leftColumn}>
            <Image
              src={photoData?.photo?.regular}
              alt={photoData?.photo?.description}
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
              <Button kind="buttonText" color="accent" onClick={handleDownload}>
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
