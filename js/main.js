import { getData } from './photo-api.js';
import { displayThumbnails } from './photo-thumbnails.js';
import { initForm } from './form-init.js';

const photosArray = [];
const DEBOUNCE_DELAY = 500;
const RANDOM_PHOTO_COUNT = 10;
const filtersSection = document.querySelector('.img-filters');
const imagesContainer = document.querySelector('.pictures');
const filtersWrapper = document.querySelector('.img-filters');
let allPhotos = [];
let filteredImages = [];

// Функция для создания задержки (debounce)
const debounceFunction = (callback, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

const getRandomImages = (photos) => {
  const shuffledPhotos = [...photos].sort(() => Math.random() - 0.5);
  return shuffledPhotos.slice(0, RANDOM_PHOTO_COUNT);
};

const getMostDiscussedImages = (photos) => [...photos].sort((a, b) => b.comments.length - a.comments.length);

const clearImages = () => {
  imagesContainer.querySelectorAll('.picture').forEach((photo) => photo.remove());
};

const handleFilterChange = debounceFunction((filter) => {
  clearImages();
  switch (filter) {
    case 'filter-default':
      filteredImages = allPhotos;
      break;
    case 'filter-random':
      filteredImages = getRandomImages(allPhotos);
      break;
    case 'filter-discussed':
      filteredImages = getMostDiscussedImages(allPhotos);
      break;
  }

  displayThumbnails(filteredImages);
}, DEBOUNCE_DELAY);

// Инициализация фильтров
const initializeFilters = () => {
  filtersSection.classList.remove('img-filters--inactive');

  filtersSection.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      // Убираем активный класс с предыдущей кнопки
      filtersSection.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      // Добавляем активный класс нажатой кнопке
      evt.target.classList.add('img-filters__button--active');
      // Вызываем функцию фильтрации
      handleFilterChange(evt.target.id);
    }
  });
};

// Загрузка фотографий с сервера
const loadImages = async () => {
  try {
    allPhotos = await getData(); // Загружаем фотографии с сервера
    filteredImages = allPhotos; // По умолчанию отображаем все фотографии
    filtersWrapper.classList.remove('img-filters--inactive'); // Показываем блок фильтров
    initializeFilters(); // Инициализируем фильтры
    displayThumbnails(filteredImages); // Отображаем изображения на странице
  } catch (error) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'Не удалось загрузить изображения. Пожалуйста, попробуйте позже.';
    errorMessage.style.cssText = `
      color: red;
      text-align: center;
      font-size: 20px;
      margin-top: 20px;
    `;
    document.body.appendChild(errorMessage);
  }
};

loadImages();

initForm(photosArray, displayThumbnails);
