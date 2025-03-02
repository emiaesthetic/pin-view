import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import style from './Search.module.css';

import { ReactComponent as SearchIcon } from '@/assets/img/search.svg';
import Button from '@/components/Button';
import { searchRequest } from '@/store/gallery/gallerySlice';

export const Search = ({ search, setSearch }) => {
  const storeSearch = useSelector(state => state.gallery.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    if (search && search !== storeSearch) {
      dispatch(searchRequest(search));
      navigate(`/photos/${search}`);
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        className={style.input}
        type="search"
        onChange={event => setSearch(event.target.value.trim())}
        value={search}
        required
      />
      <Button kind="input" type="submit" aria-label="Search">
        <SearchIcon className={style.icon} aria-hidden="true" />
      </Button>
    </form>
  );
};

Search.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
};
