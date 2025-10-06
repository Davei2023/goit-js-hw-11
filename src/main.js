// стили
import './css/styles.css';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

// js
import iziToast from 'izitoast';
import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('.form input[name="search-text"]'),
  gallery: document.querySelector('.gallery'),
  searchBtn: document.querySelector('.search-btn'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const query = refs.input.value.trim();

  if (!query) {
    createMessage(`The search field can't be empty! Please, enter your request!`);
    return;
  }
  if (query.length > 100) {
    createMessage(`Search query must be 100 characters or less.`);
    return;
  }

  clearGallery();
  showLoader();
  refs.searchBtn.disabled = true;

  getImagesByQuery(query, { page: 1, perPage: 20, lang: 'en' })
    .then(({ hits }) => {
      if (!Array.isArray(hits) || hits.length === 0) {
        createMessage(`Sorry, there are no images matching your search query. Please, try again!`);
        return;
      }
      createGallery(hits, { replace: true });
      refs.form.reset();
    })
    .catch(() => {
      createMessage(`Something went wrong. Please, try again later.`);
    })
    .finally(() => {
      hideLoader();
      refs.searchBtn.disabled = false;
    });
}

function createMessage(message) {
  iziToast.show({
    class: 'error-svg',
    position: 'topRight',
    icon: 'error-svg',
    message,
    maxWidth: '432',
    messageColor: '#fff',
    messageSize: '16px',
    backgroundColor: '#EF4040',
    close: false,
    closeOnClick: true,
  });
}