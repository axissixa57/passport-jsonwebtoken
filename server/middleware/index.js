const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('../config');

const passportInitializer = require('../lib/passportInitializer');
const gitHubStrategy = require('../passport/githubStrategy');
const localStrategy = require('../passport/localStrategy');

module.exports = (app) => {
    // secret a string or array used for signing cookies. This is optional and if not specified, will not parse signed cookies. If a string is provided, this is used as the secret. If an array is provided, an attempt will be made to unsign the cookie with each secret in order.
    app.use(cookieParser('passport_test')); // записывает куки пользователя
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors(config.corsOptions)); // без этого будет ошибка из-за политити cors
    // resave: true - Forces the session to be saved back to the session store, even if the session was never modified during the request. your store sets an expiration date on stored sessions, then you likely need resave: true. Типо обновляем срок действия сессии, перезаписывая её
    // saveUninitialized - Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. приводит к сохранению новых (неинициализированных) сеансов в хранилище, даже если они не менялись
    // secret - ключ, используемый для подписания cookie-файла индетификатора сеанса.
    app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); 
    // Note that enabling session support is entirely optional, though it is recommended for most applications. If enabled, be sure to use session() before passport.session() to ensure that the login session is restored in the correct order.
    // To use Passport in an Express or Connect-based application, configure it with the required passport.initialize() middleware. If your application uses persistent login sessions (recommended, but not required), passport.session() middleware must also be used.
    app.use(passport.initialize());
    app.use(passport.session());
    // регистрация стратегий passport-а
    passportInitializer(passport, gitHubStrategy, localStrategy);
};
