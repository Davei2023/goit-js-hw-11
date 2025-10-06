import SimpleLightbox from 'simplelightbox';

const galleryEl = document.querySelector('.gallery');
const loaderBackdropEl = document.querySelector('.loader-backdrop');

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 200,
  animationSlide: false,
  showCounter: false,
  overlayOpacity: 0.7,
  docClose: true,
  history: true,
});

export function createGallery(images) {
  const markup = images
    .map(({ webformatURL, largeImageURL, tags }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${escapeHtml(tags || '')}" loading="lazy" />
        </a>
      </li>
    `)
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderBackdropEl.classList.remove('is-hidden');
}

export function hideLoader() {
  loaderBackdropEl.classList.add('is-hidden');
}

// безопасный alt
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[s]));
}