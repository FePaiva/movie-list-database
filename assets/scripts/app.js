const addMovieModal = document.getElementById('add-modal');
const addMovieButton = document.querySelector('header button');
const backDrop = document.getElementById('backdrop');
const cancelAddMovieButton = document.querySelector('.btn--passive');
const confirmAddMovieButton = document.querySelector('.btn--success');
const userInputs = addMovieModal.querySelectorAll('input');
const movies = [];

const toggleBackDrop = () => {
  backDrop.classList.toggle('visible');
};
const toggleMovieModal = () => {
  addMovieModal.classList.toggle('visible');
  toggleBackDrop();
};

const clearMovieInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
};

const cancelAddMovieHandler = () => {
  toggleMovieModal();
  clearMovieInput();
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
    alert('Please enter valid values.');
    return;
  }

  const newMovie = {
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log('movies', movies);
  toggleMovieModal();
  clearMovieInput();
};

const backdropClickHandler = () => {
  toggleMovieModal();
  clearMovieInput();
};

addMovieButton.addEventListener('click', toggleMovieModal);
backDrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
