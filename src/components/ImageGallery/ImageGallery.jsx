import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Button, Modal } from '../index';
import { ColorRing } from 'react-loader-spinner';
import fetchPictures from '../../services/picturesAPI';
import css from './Image.Gellery.module.css';
import React, { useEffect, useState } from 'react';
import { notify } from '../App';

const ImageGallery = ({ query }) => {
  const perPage = 12;
  const [pictures, setPictures] = useState([]);
  const [findQuery, setCurrentQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageId, setModalId] = useState(0);

  useEffect(() => {
    if (!findQuery) return;
    setLoading(true);
    fetchPictures(findQuery, page)
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          notify('There is no results');
        }
        setPictures(picture => [...picture, ...hits]);
        setTotalPages(Math.ceil(totalHits / perPage));
      })
      .catch(error => notify(`Error`))
      .finally(() => setLoading(false));
  }, [findQuery, page]);

  useEffect(() => {
    if (!query) return;
    setPictures([]);
    setCurrentQuery(query);
    setPage(1);
  }, [query]);

  const handleLoadMoreBtnClick = () => {
    setPage(page => page + 1);
  };
  const openModal = imageID => {
    const modalId = pictures.findIndex(({ id }) => id === imageID);
    setModalId(modalId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {loading && (
        <ColorRing
          visible={true}
          height="400"
          width="400"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass={css.loader}
          colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
        />
      )}
      <ul className={css.ImageGallery}>
        {pictures.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            onImageClick={openModal}
            webformatURL={webformatURL}
            tags={tags}
          />
        ))}
      </ul>
      {page < totalPages && (
        <Button onClick={handleLoadMoreBtnClick} disabled={loading} />
      )}
      {showModal && (
        <Modal
          pictures={pictures}
          closeModal={closeModal}
          modalImageId={modalImageId}
        ></Modal>
      )}
    </>
  );
};
ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
export default ImageGallery;
