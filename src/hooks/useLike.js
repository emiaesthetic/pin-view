import { useDispatch } from 'react-redux';

import { reactionRequest } from '@/store/reaction/reactionSlice';

const useLike = () => {
  const dispatch = useDispatch();

  const handleLike = (photoID, currentLikeState, count) => {
    dispatch(reactionRequest({ photoID, currentLikeState, count }));
  };

  return { handleLike };
};

export default useLike;
