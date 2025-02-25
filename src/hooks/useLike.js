import { useDispatch } from 'react-redux';

import { reactionRequest } from '@/store/reaction/reactionSlice';

const useLike = () => {
  const dispatch = useDispatch();

  const handleLike = (photoID, currentLikeState) => {
    dispatch(reactionRequest({ photoID, currentLikeState }));
  };

  return { handleLike };
};

export default useLike;
