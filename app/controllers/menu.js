define([
  "angular",
  "angularRoute",
  "firebase",
  "bootstrap", 
], function(angular, angularRoute, firebase, bootstrap) {
  angular.module("balanceItApp.menu", ["ngRoute"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/game", {
      templateUrl: "../partials/game.html",
      controller: "menuCtrl",
      controllerAs: "menuCtrl"
    });
  }])

  .controller("menuCtrl", ["$firebaseArray", "getCompounds", "$scope", "gameFactory", "preload",
   function($firebaseArray, getCompounds, $scope, gameFactory, preload) {
    
    var game = gameFactory;
    var canvas;
    console.log("game", game);
    game.state.add('menu', {preload:preload, create:create});
    game.state.start('menu');
    

    function create() {
      console.log("create");
      game.physics.startSystem(Phaser.Physics.ARCADE);

      game.add.sprite(900, 300);
      game.add.sprite(game.world.x, game.world.y, 'background');
      button = game.add.button(10, 20, 'beaker', startClick, this);
      button.scale.setTo(1);
    }
    function startClick () {
      window.location = "#/level1";
    }
  }]);

});