import style from './CommentForm.module.css';
import { ReactComponent as SendIcon } from './img/send.svg';

import Button from '@/components/Button';

export const CommentForm = () => (
  <form className={style.form}>
    <input className={style.input} type="text" placeholder="Add comment" />
    <Button kind="buttonComment" type="submit" aria-label="Send comment">
      <SendIcon aria-hidden="true" />
    </Button>
  </form>
);
