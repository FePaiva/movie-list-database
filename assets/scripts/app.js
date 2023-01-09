const addMovieModal = document.getElementById('add-modal');
const addMovieButton = document.querySelector('header button');

addMovieButton.addEventListener('click', () => {
  addMovieModal.classList.add('visible');
});
