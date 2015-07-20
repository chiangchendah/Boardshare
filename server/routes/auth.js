var db = require('../db/db.js');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var GitHubStrategy = require('p-gh-boardshare').Strategy;

/* Credentials for Passport */
var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '9b718b46500e52b18413';
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '6a19a1034839aed3841bdae699101ec3e66fb288';

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
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:9000/auth/github/callback"
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

    db.user.findOne({ githubId: profile.id })
      .exec(function (err, user) {
        // user found in database
        if(user) {
          done(null, user);
        }else{
          // create new user
          user = new db.user({
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
    secret: 'WAT secret',
    store: new MongoStore({
      url: process.env.MONGOLAB_URI || "mongodb://localhost/boardshare" // for heroku
    }),
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize()); // initializes passport
  app.use(passport.session()); // used for persistent login sessions
  
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
