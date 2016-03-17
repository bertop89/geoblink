'use strict';

angular.module('geoblinkApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        template: '<cities></cities>'
      });
  });
