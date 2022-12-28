import { ImageGellery, SearchBar } from './components/index';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';

const Container = styled.div`
  margin: 0 auto 20px;
  width: 80%;
  position: relative;
`;
export const notify = message => toast.error(message);
const App = () => {
  const [query, setQuery] = useState('');

  const pictureQuery = query => {
    setQuery(query);
  };
  return (
    <Container>
      <SearchBar pictureQuery={pictureQuery} />
      <ImageGellery query={query} notify={notify} />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </Container>
  );
};
export default App;
