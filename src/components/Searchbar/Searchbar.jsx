import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import React, { useState } from 'react';
import { notify } from '../App';
const Searchbar = ({ pictureQuery }) => {
  const [inputValue, setInput] = useState('');

  const handleInputChange = ({ currentTarget }) => {
    const normalizedInput = currentTarget.value;
    setInput(normalizedInput);
  };
  const handleOnSubmit = event => {
    event.preventDefault();
    const fixedInput = inputValue.trim();
    if (!fixedInput) {
      notify('Please type your query');
    } else {
      pictureQuery(fixedInput);
    }
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleOnSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}></span>
        </button>

        <input
          className={css.SearchForm_input}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  pictureQuery: PropTypes.func.isRequired,
};
export default Searchbar;
