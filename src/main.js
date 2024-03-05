import { getImages, limit } from './js/pixabay-api';
import {
  renderMarkup, 
  showErrorCustom, 
} from './js/render-functional';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery-list a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const loadingAfterImgEl = document.querySelector('.loading');
const loadingBeforeImgEl = document.querySelector('.form-container div');
const inputEL = document.querySelector('input');
const formSearchImg = document.querySelector('form');
const loadMoreImgBtn = document.querySelector('.load-more-img');
const galleryListEl = document.querySelector('.gallery-list');
let loadPageImg = 1;
let curentSearch;

loadMoreImgBtn.classList.add('hidden');

formSearchImg.addEventListener('submit', handleSearchImg);

async function handleSearchImg(event) {
  event.preventDefault();
  loadPageImg = 1;
  curentSearch = inputEL.value;
  galleryListEl.innerHTML = '';
  loadMoreImgBtn.classList.add('hidden');
  const data = await getImages(loadPageImg, curentSearch);

  if (inputEL.value.trim() === '') {
    loadMoreImgBtn.classList.add('hidden');
    showErrorCustom('Sorry, input is emty. Please try again!', '#FFA000');
    return;
  }
  loadingBeforeImgEl.classList.add('loader');


  try {
    const data = await getImages(loadPageImg, curentSearch);
    if (data.total === 0) {
      showErrorCustom(
        'Sorry, there are no images matching your search query. Please try again!',
        '#EF4040',
        cross
      );
      loadingBeforeImgEl.classList.remove('loader');
      loadMoreImgBtn.classList.add('hidden');
      formSearchImg.reset();
      return;
    }
      
        renderMarkup(data.hits, galleryListEl);
        if(data.hits.length < 14) {
          loadMoreImgBtn.classList.add('hidden');
        } else {
          loadingBeforeImgEl.classList.remove('loader');
          loadMoreImgBtn.classList.remove('hidden');
      
          lightbox.refresh();
        }
  
  } catch (error) {
    showErrorCustom('Something went wrong.Please try later');
    
  }
  formSearchImg.reset();
}

loadMoreImgBtn.addEventListener('click', addMoreImg);

async function addMoreImg() {
  loadPageImg += 1;
  loadingAfterImgEl.classList.add('loader');
  loadMoreImgBtn.classList.add('hidden');
  try {
    const data = await getImages(loadPageImg, curentSearch);
    renderMarkup(data.hits, galleryListEl);
    loadingBeforeImgEl.classList.remove('loader');
    loadingAfterImgEl.classList.remove('loader');
    loadMoreImgBtn.classList.remove('hidden');
    window.scrollBy({
      top: 575.6666870117188,
      behavior: 'smooth',
    });
    if (data.hits.length < limit) {
      loadMoreImgBtn.classList.add('hidden');
      return showErrorCustom(
        "We're sorry, but you've reached the end of search results.",
        '#0071BD'
      );
    }
    lightbox.refresh();
  } catch (error) {
    loadingAfterImgEl.classList.remove('loader');
    showErrorCustom('You have more 100 requests per minute.Please try later');
  }
}