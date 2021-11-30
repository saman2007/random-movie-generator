//variables
const genre = document.querySelector(".genre_filter");
const year = document.querySelector(".year_filter");
const sort = document.querySelector(".sort_filter");

//event listeners
document
  .querySelector(".generate")
  .addEventListener("click", generateRandomMovie);

//an sync function to feth the arrays of movies
async function getMoviesList(genre, year, sort, page = 1) {
  //disable the button to prevent user entering button
  document.querySelector(".generate").disabled = true;
  //add queries with selected options
  let request = `https://api.themoviedb.org/3/discover/movie?sort_by=${sort}${
    year != "All" ? "&primary_release_year=" + year : ""
  }${
    genre != "All" ? "with_genres=" + genre : ""
  }api_key=****&page=${page}`;
  let movies = await fetch(request);
  movies = await movies.json();
  //remove daisabled attribute to let user generate an other random movie
  document.querySelector(".generate").disabled = false;
  return movies;
}

//to genrate a random movie
function generateRandomMovie() {
  let random_index;
  //to genrate a random movie, we should know how many pages and results in a page, we have
  getMoviesList(genre.value, year.value, sort.value).then((value) => {
    if (value.page == 1) {
      //after the first request, we send another request but this time with a random page between 1 and all pages
      getMoviesList(
        genre.value,
        year.value,
        sort.value,
        Math.floor(Math.random() * value.total_pages) + 1
      )
        .then((value) => {
          //here we choose a random index in the results array
          random_index =
            Math.floor(Math.random() * value.results.length - 1) + 1;
            //here we send all values we need to addMovieInfos and the random movies infos will be displayed
          addMovieInfos(
            value.results[random_index].poster_path,
            value.results[random_index].title,
            value.results[random_index].overview,
            value.results[random_index].release_date,
            value.results[random_index].original_language,
            value.results[random_index].vote_average,
            value.results[random_index].popularity,
            value.results[random_index].genre_ids
          );
        })
        .catch((reason) => {
          console.log("error: " + reason);
          document.querySelector(".generate").disabled = false;
        });
    }
  });
}
