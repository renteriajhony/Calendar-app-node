const { response } = require('express');
const User = require('./../models/User');

const loginUser = (req, res = response) => {
  const { email, password } = req.body;

  res.status(200).send({
    ok: true,
    email,
    password,
    msg: 'login',
  });
};
const createUser = async (req, res = response) => {
  /* const { name, email, password } = req.body; */

  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).send({
      ok: true,
      ...req.body,
      msg: 'register',
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con Jhony',
    });
  }
};

const revalidateTokent = (req, res = response) => {
  res.send({
    ok: true,
    msg: 'revalidate tokent',
  });
};

module.exports = {
  loginUser,
  createUser,
  revalidateTokent,
};
