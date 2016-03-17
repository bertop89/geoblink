'use strict';

describe('Component: CitiesComponent', function () {

  // load the controller's module
  beforeEach(module('geoblinkApp'));

  var CitiesComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CitiesComponent = $componentController('CitiesComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
