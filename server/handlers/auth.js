const User = require('../models/user');
const { hashPassword } = require('../lib/bcrypt');

const config = require('../config');
const {signToken} = require('../lib/jwt');

exports.register = async (req, res, next) => {
    try {
        const data = req.body;
        const userExists = await User.findOne({ username: data.username });
        if (userExists) {
            res.status(409).send('User already exists');
        } else {
            const user = new User({ username: data.username, password: await hashPassword(data.password)});
            const savedUser = await user.save(); // вроде как в бд данные хранятся в объекте bson
            const token = signToken(savedUser.toJSON()); // переоводит из bson в json и затем формируем токен
            res.cookie('auth', token); // отправляем токен в куки под именем auth
            res.send('Ok');
        }
    } catch (err) {
        res.status(404).send(err);
    }
};

exports.logout = (req, res) => {
    req.logout(); // passport
    res.clearCookie('auth');
    res.clearCookie('connect.sid');
    res.send('Ok');
};

// после проверки токена в ф-ции checkAuthentication, кот. всегда срабатывает когда идём на защищенный url (.../api/me например), она запишет данные о юзере в req.user
exports.getUser = (req, res, next) => {
    User.findById(req.user._id)
        .then(user => res.status(200).json(user)) // отправляем данные и юзер сможет попасть на желаемую страницу
        .catch(() => res.status(404).json('Not found'))
};

exports.localAuthHandler = (req, res) => {
    //  middleware из прошлого шага запише req.user данные благодаря passport,
    if (req.user) {
        const token = signToken(req.user);
        res.cookie('auth', token);
        res.send('Ok')
    } else {
        res.status(500).send('Send user please')
    }
};

exports.githubAuthHandler = (req, res) => {
    if (req.user) {
        const token = signToken(req.user);
        res.cookie('auth', token);
        res.redirect(config.successRedirect)
    } else {
        res.redirect(config.failureRedirect)
    }
};
