const store = require('./appStore');

const render = require('./render');

store.subscribe(() => {
  const g = render(store.getState());
  console.log("g: " + g);
  if(g) document.getElementById('searchResults').appendChild(g);
});

document.getElementById('searchTextInput').addEventListener('keypress', (event) => {
  const searchTerm = event.target.value;
  store.dispatch({
    type: 'SEARCH_TERM_CHANGED',
    searchTerm
  });
});

document.getElementById('searchForm').addEventListener('submit', (event) => {
  event.preventDefault();
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=843a0406123e1b0b1048f4f810755a87&language=en-US&query=${store.getState().searchTerm}&page=1&include_adult=false`)
    .then(res => res.json())
    .then(r => {
        store.dispatch({
          type: 'SEARCH_COMPLETE',
          searchResults: r
        });
    });
  store.dispatch({
    type: 'START_SEARCH'
  });
});

/*

{
  searchTerm: "",
  searching: true / false,
  searchResults: [{

  }]
}



*/
