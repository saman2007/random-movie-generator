//helpers.js add year and genre option to select and show the information that we got from url
addGenreToFilter()
addYearToFilter()

//to add years to the select tag
function addYearToFilter() {
  //for start year
  let startYear = new Date().getFullYear();

  //add year filter
  for (let index = startYear; index >= startYear - 50; index--) {
    let option = document.createElement("option");
    option.value = index + "&";
    option.textContent = index;
    document.querySelector(".year_filter").appendChild(option);
  }
}

//to add all genres to the select tag
function addGenreToFilter() {
  /*get the genres list and in loop,
  /*set genre name as the name of option and set the genre id as the value of option*/
    genreList().then(genres => {
        genres.genres.forEach(genre => {
            let option = document.createElement("option");
            option.value = `${genre.id}&`;
            option.textContent = genre.name;
            document.querySelector(".genre_filter").appendChild(option)
        });
    })
}

//to get an array of objects with genre id and genre name
async function genreList() {
  let genres = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=****&language=en-US"
  );
  genres = await genres.json();
  return genres;
}

//a function to add movie informations to the html file
function addMovieInfos(
  poster_link,
  title,
  overview,
  release_date,
  language,
  vote,
  popularity,
  genres = []
) {
  genreList().then((genresForCheck) => {
    genresForCheck = genresForCheck.genres;
    let genresName = "";
    //to check the genres name with genre id
    genres.forEach((element) => {
      genresForCheck.forEach((genreID) => {
        if (element == genreID.id) genresName += `${genreID.name},  `;
      });
    });
    //add information like movie name, photo, overview and etc
    document.querySelector(".movie-infos").innerHTML = `        
      <div class="pic-container">
      <img
        src="${
          poster_link ? "https://image.tmdb.org/t/p/original" + poster_link : ""
        }"
        class="movie-image"
        alt="photo"
      />
    </div>
    <div class="important-infos">
      <p class="text">
        <span
          style="
            color: rgb(34, 34, 34);
            margin-bottom: 3px;
            font-size: 19px;
          "
          >title: </span
        >${title}
      </p>
      <p class="text">
        <span
          style="
            color: rgb(34, 34, 34);
            margin-bottom: 3px;
            font-size: 19px;
          "
          >overview:
        </span>
      ${overview}
      </p>
      <p class="text">
        <span
          style="
            color: rgb(34, 34, 34);
            margin-bottom: 3px;
            font-size: 19px;
          "
          >release date: </span
        >${release_date}
      </p>
      <p class="text">
      <span
        style="
          color: rgb(34, 34, 34);
          margin-bottom: 3px;
          font-size: 19px;
        "
        >genres: </span
      >${genresName}
    </p>
      <p class="text">
        <span
          style="
            color: rgb(34, 34, 34);
            margin-bottom: 3px;
            font-size: 19px;
          "
          >original language: </span
        >${language}
      </p>
      <p class="text">
        <span
          style="
            color: rgb(34, 34, 34);
            margin-bottom: 3px;
            font-size: 19px;
          "
          >vote average: </span
        >${vote}
      </p>
      <p class="text">
      <span
        style="
          color: rgb(34, 34, 34);
          margin-bottom: 3px;
          font-size: 19px;
        "
        >popularity: </span
      >${popularity}
    </p>
    </div>
  `;
  });
}
