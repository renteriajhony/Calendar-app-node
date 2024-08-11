/// Ruter de Usuarios / Auth
/// host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/validate-fields');
const router = Router();

const {
  createUser,
  loginUser,
  revalidateTokent,
} = require('../controllers/auth');

router.post(
  '/',
  [
    //middlewares
    check('email', 'El email es requerido').isEmail(),
    check('password', 'La contraeña es requerida').not().isEmpty(),
    check('password', 'La contraeña debe tener minimo 6 caracteres').isLength(
      6
    ),
    validateFields,
  ],
  loginUser
);
router.post(
  '/new',
  [
    //middlewares
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
    check('password', 'La contraeña debe tener minimo 6 caracteres').isLength(
      6
    ),
    validateFields,
  ],
  createUser
);
router.get('/renew', revalidateTokent);

module.exports = router;
