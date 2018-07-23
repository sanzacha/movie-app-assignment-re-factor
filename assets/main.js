'use strict';

class Movie {
    MoviesList(movieName) {
        fetch('https://api.themoviedb.org/3/search/movie?api_key=f58323742f0d3b835da1b436ef1eada3&query='+movieName)
        .then((response) => response.json())
        .then((movieData) => this.ListMovieApp(movieData))
    }

    ListMovieApp(movieData) {
        let moveList = movieData.results,
            targetList = document.getElementById("moiveList"),
            listItem = targetList.getElementsByTagName("li");

        while (targetList.firstChild) {
            targetList.removeChild(targetList.firstChild);
        }

        if (movieData.total_results !== 0) {
            moveList.forEach(function(value, i) {
                const indexId = i;
                const imageURL = 'http://image.tmdb.org/t/p/w185/' + value.poster_path;
                const title = value.title;
                const description = value.overview;
                const count = value.vote_count;

                const _createMovieTemp = document => html => {
                    const temp = document.createElement('template');
                          temp.innerHTML = html;
                        return temp.content.firstElementChild;
                }
                
                const createMovieHtmlTemplate = _createMovieTemp(document);
                
                const createMovieHtml = imageURL => title => description =>`
                    <li class="list-group-item" data-id="${indexId}">
                        <span class="cls-title">${title}</span>
                        <img src="${imageURL}">
                        <span class="badge badge-primary badge-pill">Vote: ${count}</span>
                        <div class="description">${description}</div>
                        <button class="btn btn-primary js-add-favourites" type="button">Add to favourites</button>  
                    </li>
                `;
                
                const movieHtml = createMovieHtml(imageURL)(title)(description);
                const movieItem = createMovieHtmlTemplate(movieHtml);
                
                document.getElementById('moiveList').appendChild(movieItem);
            });

            let results = [],
                addFavDetails = document.querySelectorAll('.js-add-favourites');

            for (var i = 0; i < addFavDetails.length; i++) {
                let moviefavdata = {};
                addFavDetails[i].addEventListener('click', function (event) {
                    event.preventDefault();
                    let getListId = this.parentElement.dataset.id;
                        results.push(movieData.results[getListId]);
                        localStorage.setItem('myfavmovies', JSON.stringify(results));
                        let getMyFavMovies = localStorage.getItem('myfavmovies');
                });
            }
        } else {
            let li = document.createElement('li');
                li.className = 'list-group-item';
                li.appendChild(document.createTextNode('No Data found....'));
                targetList.appendChild(li);
        }
    }
}

const moive = new Movie();

let getMyFavMovies = localStorage.getItem('myfavmovies');

if (getMyFavMovies !== null) {
    let favData = {"results": JSON.parse(getMyFavMovies)};
    moive.ListMovieApp(favData);
} 

document.querySelector('#getMovieList').addEventListener('submit', function(e) {
    e.preventDefault();
    let movieName = document.getElementById('inputMoiveName').value;
        moive.MoviesList(movieName);
});