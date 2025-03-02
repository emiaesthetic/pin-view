import { useSelector, useDispatch } from 'react-redux';

import { reactionRequest } from '@/store/reaction/reactionSlice';

const useLike = () => {
  const likeError = useSelector(state => state.reaction.error);
  const dispatch = useDispatch();

  const handleLike = (id, liked) => {
    dispatch(reactionRequest({ id, liked }));
  };

  return { likeError, handleLike };
};

export default useLike;
