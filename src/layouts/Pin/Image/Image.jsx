import style from './Image.module.css';

export const Image = props => (
  <div className={style.wrapper}>
    <img className={style.img} {...props} />
  </div>
);
