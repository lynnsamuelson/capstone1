define([
  "phaser",
  "angular",
  "bootstrap",
  "angularfire",
  "angularRoute",
  "angularFilter",
  "factories/uid",
  "factories/gameFactory",
  "factories/preload",
  "controllers/auth",
  "controllers/username",
  "controllers/gameCtrl",
  "controllers/home",
  "controllers/get-ions",
  "factories/getCompounds",
  "factories/getEquations",
  "controllers/menu",
  "controllers/level1",
  "controllers/menu2",
  "controllers/level2",
  "controllers/menu3",
  "controllers/level3",
], function(phaser, angular, bootstrap, angularfire, angularRoute, filter, uid, gameFactory,
 preload, auth, username, gameCtrl, home, getIons, getCompound, getEquations, menu, level1, menu2, level2, menu3, level3) {
  return angular.module("balanceItApp", [
    "ngRoute",
    "firebase",
    "balanceItApp.uid",
    "balanceItApp.gameFactory",
    "balanceItApp.preload",
    "balanceItApp.auth",
    "balanceItApp.username",
    "balanceItApp.gameCtrl",
    "balanceItApp.home",
    "balanceItApp.getIons",
    "balanceItApp.getCompounds",
    "balanceItApp.getEquations",
    "balanceItApp.menu",
    "balanceItApp.level1",
    "balanceItApp.menu2",
    "balanceItApp.level2",
    "balanceItApp.menu3",
    "balanceItApp.level3"
  ]).
  config(["$routeProvider", function($routeProvider) {
    $routeProvider.otherwise({redirectTo: "/"});
  }]);
});

