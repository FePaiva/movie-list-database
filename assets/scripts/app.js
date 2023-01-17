const addMovieModal = document.getElementById('add-modal');
const addMovieButton = document.querySelector('header button');
const backDrop = document.getElementById('backdrop');
const cancelAddMovieButton = document.querySelector('.btn--passive');
const confirmAddMovieButton = document.querySelector('.btn--success');
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const movieList = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');

let movies = JSON.parse(localStorage.getItem('movies')) || [];

const toggleBackDrop = () => {
  backDrop.classList.toggle('visible');
};

const updatePage = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const cancelMovieDeletion = () => {
  toggleBackDrop();
  deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  movieList.children[movieIndex].remove();
  localStorage.setItem('movies', JSON.stringify(movies));
  cancelMovieDeletion();
  updatePage();
};

const startDeleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  toggleBackDrop();
  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  // had to replace the button and clone it since the event listener was accumulating.
  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
  // had to remove the event listener as it was accummulating.
  cancelDeletionButton.removeEventListener('click', cancelMovieDeletion);

  cancelDeletionButton.addEventListener('click', cancelMovieDeletion);
  confirmDeletionButton.addEventListener(
    'click',
    deleteMovieHandler.bind(null, movieId)
  );
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5</p>
    </div>
  `;
  newMovieElement.addEventListener(
    'click',
    startDeleteMovieHandler.bind(null, id)
  );
  movieList.append(newMovieElement);
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackDrop();
};

const clearMovieInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearMovieInput();
  toggleBackDrop();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  localStorage.setItem('movies', JSON.stringify(movies));
  console.log('movies', localStorage);
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  closeMovieModal();
  toggleBackDrop();
  clearMovieInput();
  updatePage();
};

const backdropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
  clearMovieInput();
};

updatePage();

movies.forEach((movie) => {
  renderNewMovieElement(movie.id, movie.title, movie.image, movie.rating);
});

addMovieButton.addEventListener('click', showMovieModal);
backDrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
