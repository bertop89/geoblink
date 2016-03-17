'use strict';

angular.module('geoblinkApp', [
  'geoblinkApp.auth',
  'geoblinkApp.admin',
  'geoblinkApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
