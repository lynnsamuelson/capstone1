define([
  "angular",
  "angularRoute",
  "firebase",
  "bootstrap", 
], function(angular, angularRoute, firebase, bootstrap) {
  angular.module("balanceItApp.home", ["ngRoute"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/home", {
      templateUrl: "../partials/home.html",
      controller: "homeCtrl",
      controllerAs: "home"
    });
  }])

  .controller("homeCtrl", ["$firebaseArray", "gameFactory", "preload", function($firebaseArray, gameFactory, preload) {
    var game = gameFactory;
    var canvas;
    game.state.add('home', {preload:preload, create:create});
    game.state.start('home');

    function create() {
      game.stage.backgroundColor = 0xffffff;
    }


  }]);
}
);