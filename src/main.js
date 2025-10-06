// src/main.js

import './css/styles.css';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

// JS
import iziToast from 'izitoast';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

// --------- refs ----------
const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader-container'),
  searchBtn: document.querySelector('.search-btn'),
};

if (refs.form) {
  refs.form.addEventListener('submit', onSubmit);
}

// --------- handlers ----------
function onSubmit(e) {
  e.preventDefault();


  const query = refs.form.elements.query.value.trim();

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
        createMessage(
          `Sorry, there are no images matching your search query. Please, try again!`
        );
        return;
      }
      createGallery(hits, { replace: true });

      refs.form.reset();
    })
    .catch(err => {
      const status = err?.response?.status;

      if (status === 429) {
        const reset = Number(err.response?.headers?.['x-ratelimit-reset']);
        createMessage(
          `API rate limit exceeded.${Number.isFinite(reset) ? ` Try again in ~${Math.ceil(reset)}s.` : ''}`
        );
      } else if (status === 401 || status === 403) {
        createMessage(`Invalid or missing Pixabay API key.`);
      } else if (status === 400) {
        createMessage(`Bad request. Please, check your query and try again.`);
      } else {
        createMessage(`Something went wrong. Please, try again later.`);
      }
    })
    .finally(() => {
      hideLoader();
      refs.searchBtn.disabled = false;
    });
}

// --------- helpers ----------
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