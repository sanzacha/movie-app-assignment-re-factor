const gallery = require('../gallery');

module.exports = state => {
  if(!state.searchResults) return null;

  console.log(state.searchResults);

  for (let key in state.searchResults.results) {
    const title = state.searchResults.results[key].title;
    const description = state.searchResults.results[key].overview;
    const imageUrl = 'https://image.tmdb.org/t/p/w200' + state.searchResults.results[key].poster_path;


    return gallery({
      title,
      description,
      imageUrl
    });
  }


};
