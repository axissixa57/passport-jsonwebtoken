const { Strategy } = require('passport-github');
const User = require('../models/user');
const config = require('../config');

const githubStrategy = new Strategy(config.githubAuth,
function(accessToken, refreshToken, profile, done) {
  // после того как flow passporta отработал (пользватель перешёл на github, заполнил форму, его данные отправляются по адресу кот. указан у нас в конфиге, и этот адрес уже здесь обрабатывается)
  // данные из githuba находся в profile
  return User
    .findOne({'githubId': profile.id})
    .then(user => user ? user : new User({githubId: profile.id, username: profile.username}).save())
    // запишет данные пользователя в req.user
    .then(data => done(null, data.toJSON()))
    .catch(err => done(err) );
  }
);

module.exports = githubStrategy;
