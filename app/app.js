define([
  "phaser",
  "angular",
  "bootstrap",
  "angularfire",
  "angularRoute",
  "angularFilter",
  "factories/gameFactory",
  "factories/preload",
  "controllers/gameCtrl",
  "controllers/home",
  "controllers/get-ions",
  "factories/getCompounds",
  "controllers/menu",
  "controllers/level1",
], function(phaser, angular, bootstrap, angularfire, angularRoute, filter, gameFactory, preload,  gameCtrl, home, getIons, getCompound, menu, level1) {
  return angular.module("balanceItApp", [
    "ngRoute",
    "firebase",
    "balanceItApp.gameFactory",
    "balanceItApp.preload",
    "balanceItApp.gameCtrl",
    "balanceItApp.home",
    "balanceItApp.getIons",
    "balanceItApp.getCompounds",
    "balanceItApp.menu",
    "balanceItApp.level1",
  ]).
  config(["$routeProvider", function($routeProvider) {
    $routeProvider.otherwise({redirectTo: "/"});
  }]);
});

