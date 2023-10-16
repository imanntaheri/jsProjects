const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');
const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');
  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';

  const filteredMovie = !filter
    ? movies
    : movies.filter(movie => movie.info.title.includes(filter));

  filteredMovie.forEach(movie => {
    const movieEl = document.createElement('li');
    const { info, ...otherProps } = movie; //  On the right side point at the object where u want pull sth out of it  (it is object Destructuring)
    console.log(otherProps);
    // const { title: movieTitle } = info; // You can assign a new name to the extracted property by adding :  and the new name
    let { getFormattedTitle } = movie;
    // getFormattedTitle = getFormattedTitle.bind(movie);
    let text = getFormattedTitle.call(movie) + ' - ';
    for (const key in info) {
      if (key !== 'title') {
        console.log(key);
        text = text + `${key} : ${info[key]}`;
      }
    }
    console.log(text);
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (
    title.trim() === ' ' ||
    extraName.trim() === ' ' ||
    extraValue.trim() === ' '
  ) {
    return;
  }
  const newMovie = {
    info: {
      title, // title = title key name and value are the same
      [extraName]: extraValue, // As we dont know what the user enter here in extra data we should use [] to assign the dynamic property name
    },
    id: Math.random().toString(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    },
  };
  movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
