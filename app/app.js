define([
  "phaser",
  "angular",
  "bootstrap",
  "angularfire",
  "angularRoute",
  "angularFilter",
  "controllers/gameCtrl",
  "controllers/home",
  "controllers/get-ions",
], function(phaser, angular, bootstrap, angularfire, angularRoute, filter, gameCtrl, home, getIons) {
  return angular.module("balanceItApp", [
    "ngRoute",
    "firebase",
    "balanceItApp.gameCtrl",
    "balanceItApp.home",
    "balanceItApp.getIons"
  ]).
  config(["$routeProvider", function($routeProvider) {
    $routeProvider.otherwise({redirectTo: "/"});
  }]);
});

