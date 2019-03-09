$(document).ready(() => {
  $('#search_form').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

var secretkey = config.SECRET_KEY;

function getMovies(searchText){
  axios.get('http://www.omdbapi.com/?apikey='+secretkey+'&s=' +searchText)
  .then((response) => {
    console.log(response);
    let movies = response.data.Search;
    let output = '';
    $.each(movies, (index, movie) => {
      output += `
      <div class="col-md-3">
        <div class=" well text-center">
          <img src="${movie.Poster}">
          <h5 id="border_bottom">${movie.Title}</h5><br>
          <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-success btn-sm" href="#">
            Movie Details
          </a>
        </div>
      </div>
      `;
    }); //end of each loop

    $('#movies').html(output);
  })
  .catch((err) => {
    console.log(err);
  });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com/?apikey=8ba72612&i=' +movieId)
  .then((response) => {
    console.log(response);
    let movie = response.data;


    let output =`
      <div class="row">
        <div class="col-md-4">
          <img src="${movie.Poster} class="thumbnail">
        </div>
        <div class="col-md-8">
          <h2>${movie.Title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="well">
          <h3>Plot</h3>
          ${movie.Plot}
          <hr>
          <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-success">View IMDB</a>
          <a href="index.html" class="btn btn-secondary">Go Back to Search</a>
        </div>
      </div>
    `;

    $('#movie').html(output);
  })
  .catch((err) => {
    console.log(err);
  });
}
