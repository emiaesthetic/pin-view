import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ReactComponent as SearchIcon } from './img/search.svg';
import style from './Search.module.css';

import Button from '@/components/Button';

export const Search = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    navigate(`/photos/${search}`);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        className={style.input}
        type="search"
        onChange={event => setSearch(event.target.value)}
        value={search}
      />
      <Button kind="buttonComment" type="submit" aria-label="Search">
        <SearchIcon className={style.icon} aria-hidden="true" />
      </Button>
    </form>
  );
};
