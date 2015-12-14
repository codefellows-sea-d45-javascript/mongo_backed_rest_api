module.exports = function(app) {
  require('./controllers/movies_controller')(app);
  require('./directives/movie_directive')(app);
};
