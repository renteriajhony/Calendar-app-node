const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {
  try {
    const _events = await Event.find().populate('user', 'name email');

    res.status(200).send({
      ok: true,
      events: _events,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con Jhony',
    });
  }
};

const createEvent = async (req, res = response) => {
  try {
    const _event = new Event(req.body);
    _event.user = req.uid;

    const saveEvent = await _event.save();

    res.status(200).send({
      ok: true,
      event: saveEvent,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con Jhony',
    });
  }
};
const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uidUser = req.uid;

  try {
    const _event = await Event.findById(eventId);
    if (!_event) {
      return res.status(404).send({
        ok: false,
        msg: 'event dont exist',
      });
    }

    if (_event.user.toString() !== uidUser) {
      return res.status(401).send({
        ok: false,
        msg: 'Not authorized to edit this event',
      });
    }

    const newEvent = {
      ...req.body,
      user: uidUser,
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.status(200).send({
      ok: true,
      evento: eventUpdated,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con Jhony',
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uidUser = req.uid;

  try {
    const _event = await Event.findById(eventId);
    if (!_event) {
      return res.status(404).send({
        ok: false,
        msg: 'event dont exist',
      });
    }

    if (_event.user.toString() !== uidUser) {
      return res.status(401).send({
        ok: false,
        msg: 'Not authorized to edit this event',
      });
    }

    const eventDelete = await Event.findByIdAndDelete(eventId);

    res.status(200).send({
      ok: true,
      evento: eventDelete.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con Jhony',
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
