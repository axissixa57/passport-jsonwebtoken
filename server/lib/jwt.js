const jwt = require('jsonwebtoken');

// encoded with HMAC SHA256 algorithm
const signToken = (data) => {
  try {
    // secret должен быть хорошо спрятан и идти из process.env
    return jwt.sign(data, 'SuperSecret', { expiresIn: '1h' });
  } catch (error) {
    throw error;
  }
};

// decoded, в резултате получим объект пользователя
const verifyToken = (token) => new Promise((resolve, reject) =>
  jwt.verify(token, 'SuperSecret', (err, decoded) => err ? reject(err) : resolve(decoded)));

module.exports = {
  signToken,
  verifyToken
}
