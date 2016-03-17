'use strict';

var express = require('express');
var controller = require('./geoblink.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.put('/:id/businesses', controller.updateBussines);
router.delete('/:id/businesses/:bid', controller.removeBussines);

module.exports = router;
