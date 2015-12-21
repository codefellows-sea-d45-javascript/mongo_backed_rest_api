module.exports = function(app) {
  require('./controllers/officer_controller')(app);
  require('./directives/officer_directives')(app);
};
