var db = require('../db/db.js');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var GitHubStrategy = require('p-gh-boardshare').Strategy;
var config = require('../config');



passport.serializeUser(function(user, done) {
  // user is a mongo instance
  // { _id: 55ad0d337ebe45a714549d08,
  //   username: 'chiangchendah',
  //   githubId: '7493459',
  //   __v: 0,
  //   board: [] }
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

/* GitHub OAuth */
passport.use(new GitHubStrategy({
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: config.GITHUB_CALLBACK_URL // need a production version of this
  },
  function(accessToken, refreshToken, profile, done) {

    // profile pulled from github API
    // { id: '7493459',
    //   displayName: 'David Chiang',
    //   username: 'chiangchendah',
    //   profileUrl: 'https://github.com/chiangchendah',
    //   emails: [ { value: 'chiangchendah@gmail.com' } ],
    //   provider: 'github'
    // }

    db.User.findOne({ githubId: profile.id })
      .exec(function (err, user) {
        // user found in database
        if(user) {
          done(null, user);
        }else{
          // create new user
          user = new db.User({
            username: profile.username,
            githubId: profile.id,
          });
          // save new user
          user.save(function(err, user){
            done(err, user);
          });
        }
      });

  }
));


module.exports = function(app) {
  app.use(session({
    secret: config.SESSION_SECRET,
    store: new MongoStore({
      url: config.MONGODB_URL
    }),
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize()); // initializes passport
  app.use(passport.session()); // used for persistent login sessions

  app.get('/login', function (req, res){
    res.redirect('/auth/github');
  });

  app.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy(function () {
      res.redirect('/');
    });
  });

  /* Passport GitHub routes */
  app.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }));

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });
};
