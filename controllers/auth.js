const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('./../models/User');
const { generateJWT } = require('../helpers/jwt');

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!!!user) {
      return res.status('400').json({
        ok: false,
        msg: 'No se encontro un usuario con ese correo.',
      });
    }

    //Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status('400').json({
        ok: false,
        msg: 'Contraseña invalida',
      });
    }

    //Generar nuestro JWT
    const jwt = await generateJWT(user.id, user.name);

    res.status(200).send({
      ok: true,
      uid: user.id,
      name: user.name,
      token: jwt,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con Jhony',
    });
  }
};
const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!!user) {
      return res.status('400').json({
        ok: false,
        msg: 'Ya existe un usuario registrado con ese correo.',
      });
    }

    user = new User(req.body);
    //Encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    //Generar nuestro JWT
    const jwt = await generateJWT(user.id, user.name);

    res.status(201).send({
      ok: true,
      uid: user.id,
      name: user.name,
      token: jwt,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con Jhony',
    });
  }
};

const revalidateTokent = async (req, res = response) => {
  const { uid, name } = req;
  //Generar nuestro JWT
  const jwt = await generateJWT(uid, name);

  res.send({
    ok: true,
    uid,
    name,
    token: jwt,
  });
};

module.exports = {
  loginUser,
  createUser,
  revalidateTokent,
};
