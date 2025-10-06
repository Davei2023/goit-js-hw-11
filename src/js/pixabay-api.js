// src/js/pixabay-api.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

export function getImagesByQuery(query, { page = 1, perPage = 20, lang = 'en' } = {}) {
  return instance
    .get('', { params: { q: query, page, per_page: perPage, lang } })
    .then(res => res.data);
}