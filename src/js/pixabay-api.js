// src/js/pixabay-api.js
import axios from 'axios';

export const BASE_URL = 'https://pixabay.com/api/';
export const API_KEY  = '42030436-f44bf17f2fc4b636ae2b8b7a9';


export function buildUrl(query, { page = 1, perPage = 20, lang = 'en' } = {}) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: String(page),
    per_page: String(perPage),
    lang,
  });
  return `${BASE_URL}?${params.toString()}`;
}

export function getImagesByQuery(query, opts = {}) {
  const url = buildUrl(query, opts);
  return axios.get(url).then(res => res.data);
}