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
  "controllers/menu",
  "controllers/level1",
  "controllers/level2",
], function(phaser, angular, bootstrap, angularfire, angularRoute, filter, uid, gameFactory,
 preload, auth, username, gameCtrl, home, getIons, getCompound, menu, level1, level2) {
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
    "balanceItApp.menu",
    "balanceItApp.level1",
    "balanceItApp.level2"
  ]).
  config(["$routeProvider", function($routeProvider) {
    $routeProvider.otherwise({redirectTo: "/"});
  }]);
});

