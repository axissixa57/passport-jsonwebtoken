const { Strategy } = require('passport-local');
const config = require('../config');
const User = require('../models/user');
const { comparePasswords } = require('../lib/bcrypt');

// middleware
// param: config.localAuth --- After successful authentication, Passport will establish a persistent login session. This is useful for the common scenario of users accessing a web application via a browser. However, in some cases, session support is not necessary. For example, API servers typically require credentials to be supplied with each request. When this is the case, session support can be safely disabled by setting the session option to false
const localStrategy = new Strategy(config.localAuth,
  // username, password - считываются из req.body (by names of inputs from a form)
  async function (username, password, done) {
    try {
      const user = await User.findOne({ username });

      const matchPasswords = user && await comparePasswords(password, user && user.password);
      if (user && matchPasswords) {
        // passport запишет usera в объект req.user
        done(null, user.toJSON());
      } else {
        done(null, null);
      }
    } catch (err) {
      done(err);
    }
  }
);

module.exports = localStrategy;


