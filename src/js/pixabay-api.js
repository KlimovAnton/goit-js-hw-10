import axios from 'axios';

export const limit = 15;
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '42471453-a4a004408e33f852748a0909e';

export async function getImages(page, searchQwerty) {
  const typeImg = 'photo';
  const orientationImg = 'horizontal';
  const resultSearch = true;

  const { data } = await axios.get('', {
    params: {
      page: page,
      per_page: limit,
      key: API_KEY,
      q: searchQwerty,
      image_type: typeImg,
      orientation: orientationImg,
      safesearch: resultSearch,
    },
  });
  return data;
}