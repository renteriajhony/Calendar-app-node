const { response } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateJwt = (req, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      errors: 'No hay token en la peticion',
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;
    req.name = name;
  } catch (err) {
    console.warn({ err: err });

    return res.status(401).json({
      ok: false,
      errors: 'Token no valido',
    });
  }

  next();
};

module.exports = {
  validateJwt,
};
