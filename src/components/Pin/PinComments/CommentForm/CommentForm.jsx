import style from './CommentForm.module.css';

import { ReactComponent as SendIcon } from '@/assets/img/send.svg';
import Button from '@/components/Button';

export const CommentForm = () => (
  <form className={style.form}>
    <input className={style.input} type="text" placeholder="Add comment" />
    <Button kind="input" type="submit" aria-label="Send comment">
      <SendIcon className={style.icon} aria-hidden="true" />
    </Button>
  </form>
);
