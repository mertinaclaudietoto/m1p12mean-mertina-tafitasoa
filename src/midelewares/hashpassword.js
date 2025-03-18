const bcrypt = require('bcrypt');

const hashPasswordMiddleware = async (req, res, next) => {
  try {
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    next();
  } catch (err) {
    console.error('Erreur lors du hachage du mot de passe:', err);
    res.status(500).send('Erreur lors du hachage du mot de passe');
  }
};

module.exports = hashPasswordMiddleware;
