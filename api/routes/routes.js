const express = require('express');
const router = express.Router();
const eventCtrl = require('../controllers/eventController')
const colorCtrl = require('../controllers/colorController')
const cityCtrl = require('../controllers/cityController')


router.get('/event', eventCtrl.getAll);

router.get('/event/:id', eventCtrl.getEvent);

router.post('/event', eventCtrl.createEvent);

router.delete('/event/:id', eventCtrl.deleteEvent);

router.put('/event/:id', eventCtrl.updateEvent);

router.get('/colors', colorCtrl.getColors);

router.post('/colors', colorCtrl.setColor);

router.get('/cities', cityCtrl.getCities);

router.post('/cities', cityCtrl.setCity);

module.exports = router;