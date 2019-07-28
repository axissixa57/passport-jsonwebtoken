// Passport will maintain persistent login sessions. In order for persistent sessions to work, the authenticated user must be serialized to the session, and deserialized when subsequent requests are made.

// Passport does not impose any restrictions on how your user records are stored. Instead, you provide functions to Passport which implements the necessary serialization and deserialization logic. In a typical application, this will be as simple as serializing the user ID, and finding the user by ID when deserializing.

const passportInitializer = (passport, ...strategies) => {
        // после того как отработала стратегия, данные о юзере записались в req.user благодаря passport,
        // здесь они достаются и записываются в user
        passport.serializeUser((user, done) => {
          done(null, user)
        });
        passport.deserializeUser((user, done) => done(null, user));
        strategies.forEach(strategy => {
            passport.use(strategy);
        })
    };

module.exports = passportInitializer;

// В типичном веб-приложении, учетные данные, используемые для аутентификации пользователя будет передаваться только во время авторизации. Если все в порядке, и пользователь существует, то информация о нем сохраняется в сессию, а идентификатор сессии, в свою очередь, сохраняется в cookies браузера.

// Каждый последующй запрос будет содержать cookies, с помощью которого passport сможет опознать пользователя, и достать его данные из сессии. Для того, чтобы сохранять или доставать пользовательские данные из сессии, паспорт использует функции `passport.serializeUser()` и `passport.deserializeUser()`.
