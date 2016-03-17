/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/city              ->  index
 * POST    /api/city              ->  create
 * GET     /api/city/:id          ->  show
 * PUT     /api/city/:id          ->  update
 * DELETE  /api/city/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import City from './geoblink.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of City
export function index(req, res) {
  return City.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single City from the DB
export function show(req, res) {
  return City.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new City in the DB
export function create(req, res) {
  return City.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing City in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return City.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a City from the DB
export function destroy(req, res) {
  return City.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Updates a Bussiness from a City
export function updateBussines(req, res) {
  return City.findOneAndUpdate(
    { "_id": req.params.id, "businesses._id": req.body._id },
    { 
        "$set": {
            "businesses.$.id": req.body.id,
            "businesses.$.name": req.body.name,
            "businesses.$.address": req.body.address
        }
    },
    { new: true }
  ).then(respondWithResult(res, 201))
  .catch(handleError(res));
}

// Removes a Business from a City
export function removeBussines(req, res) {
  return City.findByIdAndUpdate(req.params.id, {
    '$pull': {
        'businesses':{ '_id': req.params.bid }
    }
  }).then(respondWithResult(res))
    .catch(handleError(res));
}
