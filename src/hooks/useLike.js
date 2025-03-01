import { useDispatch } from 'react-redux';

import { reactionRequest } from '@/store/reaction/reactionSlice';

const useLike = () => {
  const dispatch = useDispatch();

  const handleLike = (id, liked, likes) => {
    dispatch(reactionRequest({ id, liked, likes }));
  };

  return { handleLike };
};

export default useLike;
