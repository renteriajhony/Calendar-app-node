/// Ruter de Usuarios / events
/// host + /api/events

const { Router } = require('express');
const router = Router();
const { validateJwt } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/validate-fields');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/event');
const { isDate } = require('../helpers/isDate');

router.use(validateJwt);

//Obtener eventos
router.get('/', getEvents);
// Crear un nuevo evento
router.post(
  '/',
  [
    //middlewares
    check('title', 'El título es requerido').not().isEmpty(),
    check('start', 'La fecha de inicio es requerida').custom(isDate),
    check('end', 'La fecha final es requerida').custom(isDate),
    validateFields,
  ],
  createEvent
);
//Actualizar un nuevo evento
router.put('/:id', updateEvent);
//Eliminar un nuevo evento
router.delete('/:id', deleteEvent);

module.exports = router;
