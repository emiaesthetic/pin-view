import CommentForm from './CommentForm';
import style from './PinComments.module.css';

export const PinComments = () => (
  <>
    <div className={style.comments}></div>
    <CommentForm />
  </>
);
