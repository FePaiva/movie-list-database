const addMovieModal = document.getElementById('add-modal');
const addMovieButton = document.querySelector('header button');
const backDrop = document.getElementById('backdrop');
const cancelAddMovieButton = document.querySelector('.btn--passive');

console.log(cancelAddMovieButton);

const toggleBackDrop = () => {
  backDrop.classList.toggle('visible');
};
const toggleMovieModal = () => {
  addMovieModal.classList.toggle('visible');
  toggleBackDrop();
};

const cancelAddMovie = () => {
  toggleMovieModal();
};

const backdropClickHandler = () => {
  toggleMovieModal();
};

addMovieButton.addEventListener('click', toggleMovieModal);
backDrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovie);
