define([
  "phaser",
  "angular",
  "bootstrap",
  "angularfire",
  "angularRoute",
  "angularFilter",
  "controllers/gameCtrl",
  "controllers/home"
], function(phaser, angular, bootstrap, angularfire, angularRoute, filter, gameCtrl, home) {
  return angular.module("balanceItApp", [
    "ngRoute",
    "firebase",
    "balanceItApp.gameCtrl",
    "balanceItApp.home"
  ]).
  config(["$routeProvider", function($routeProvider) {
    $routeProvider.otherwise({redirectTo: "/"});
  }]);
});

