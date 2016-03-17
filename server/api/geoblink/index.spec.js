'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var geoCtrlStub = {
  index: 'geoCtrl.index',
  show: 'geoCtrl.show',
  create: 'geoCtrl.create',
  update: 'geoCtrl.update',
  destroy: 'geoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var cityIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './geoblink.controller': geoCtrlStub
});

describe('Cities API Router:', function() {

  it('should return an express router instance', function() {
    cityIndex.should.equal(routerStub);
  });

  describe('GET /api/cities', function() {

    it('should route to city.controller.index', function() {
      routerStub.get
        .withArgs('/', 'geoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/cities/:id', function() {

    it('should route to city.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'geoCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/cities', function() {

    it('should route to city.controller.create', function() {
      routerStub.post
        .withArgs('/', 'geoCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/cities/:id', function() {

    it('should route to city.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'geoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/cities/:id', function() {

    it('should route to city.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'geoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/cities/:id', function() {

    it('should route to city.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'geoCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
