const { verifyToken } = require('./jwt');

const checkAuthentication = async (req, res, next) => {
  try {
    // [...] - разрешённые urls, там token не нужен
    // req.isAuthenticated() - ф-ция library psaaport js

    if (req.isAuthenticated() || ['/auth/github', '/register', '/login'].some(path =>req.path.includes(path))) { // Метод includes() проверяет, содержит ли строка заданную подстроку, и возвращает, соответственно true или false
      return next(); // пропускаем юзера
    }
    const token = req.cookies.auth;
    // например true && {} вернёт {}
    const decodedToken = token && await verifyToken(token);
    console.log(decodedToken)
    if (decodedToken) {
      req.user = decodedToken;
      return next();
    } else {
      return res.status(401).send('Unauthorized');
    }
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }

};

module.exports = checkAuthentication;
