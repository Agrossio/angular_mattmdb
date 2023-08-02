export const environment = {
  production: false,
  name: 'development environment',
  baseUrl: 'http://localhost:8081/mattmdb-1.0-SNAPSHOT/api/v2',
  trendingUrl: 'https://api.themoviedb.org/3/trending/all/day?api_key=e65c4db5bae2b9b0565c97b1e317145e&page=1',
  popularUrl: 'https://api.themoviedb.org/3/discover/tv?api_key=e65c4db5bae2b9b0565c97b1e317145e&language=en-US&sort_by=popularity.desc&vote_count.gte=200&include_adult=false&include_video=true&page=1',
  apiKey: 'e65c4db5bae2b9b0565c97b1e317145e'
};
