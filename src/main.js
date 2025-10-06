// src/main.js (фрагмент)
import iziToast from 'izitoast';
import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
const form = document.querySelector('.form');
const input = form.elements['search-text'];

form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({ message: 'Введи ключове слово для пошуку.', position: 'topRight' });
    return;
  }
  if (query.length > 100) {
    iziToast.warning({ message: 'Пошуковий запит має бути ≤ 100 символів.', position: 'topRight' });
    return;
  }

  clearGallery();
  showLoader();

  const options = { page: 1, perPage: 20, lang: 'en' };

  getImagesByQuery(query, options)
    .then(({ hits }) => {
      if (!Array.isArray(hits) || hits.length === 0) {
        iziToast.info({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
      createGallery(hits);
    })
    .catch(err => {
  const status = err?.response?.status;
  if (status === 429) {
    const reset = Number(err.response.headers?.['x-ratelimit-reset']);
    iziToast.error({
      title: 'Ліміт запитів',
      message: `API rate limit exceeded. ${Number.isFinite(reset) ? `Спробуй через ~${Math.ceil(reset)} сек.` : ''}`,
      position: 'topRight',
    });
  } else if (status === 401 || status === 403) {
    iziToast.error({
      title: 'API ключ',
      message: 'Невірний або відсутній VITE_PIXABAY_API_KEY у .env',
      position: 'topRight',
    });
  } else {
    iziToast.error({
      title: 'Помилка',
      message: 'Щось пішло не так. Спробуй пізніше.',
      position: 'topRight',
    });
  }
})
    .finally(hideLoader);
}