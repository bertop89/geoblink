'use strict';

angular.module('geoblinkApp.auth', [
  'geoblinkApp.constants',
  'geoblinkApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
