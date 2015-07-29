var authRoutes = require('./auth');
var boardRoutes = require('./boards');
var userRoutes = require('./user');

module.exports = function(app){
  authRoutes(app);
  boardRoutes(app);
  userRoutes(app);
};
