import Item from './Item';
import style from './Masonry.module.css';

import Error from '@/components/Error';
import Preloader from '@/components/Preloader';
import usePhotos from '@/hooks/usePhotos';

export const Masonry = () => {
  const { data, error, loading } = usePhotos();

  if (loading) return <Preloader type="full" />;

  if (error) return <Error message={error} />;

  if (!data.length) return null;

  return (
    <ul className={style.masonry}>
      {data.map(photoData => (
        <Item key={photoData.id} {...photoData} />
      ))}
    </ul>
  );
};
