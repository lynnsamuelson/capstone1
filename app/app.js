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
  "factories/getCompounds",
  "controllers/menu",
  "controllers/level1",
  "factories/gameFactory",
], function(phaser, angular, bootstrap, angularfire, angularRoute, filter, gameCtrl, home, getIons, getCompound, menu, level1, gameFactory) {
  return angular.module("balanceItApp", [
    "ngRoute",
    "firebase",
    "balanceItApp.gameCtrl",
    "balanceItApp.home",
    "balanceItApp.getIons",
    "balanceItApp.getCompounds",
    "balanceItApp.menu",
    "balanceItApp.level1",
    "balanceItApp.gameFactory"
  ]).
  config(["$routeProvider", function($routeProvider) {
    $routeProvider.otherwise({redirectTo: "/"});
  }]);
});

