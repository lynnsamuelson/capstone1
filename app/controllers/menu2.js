define([
  "angular",
  "angularRoute",
  "firebase",
  "bootstrap", 
], function(angular, angularRoute, firebase, bootstrap) {
  angular.module("balanceItApp.menu2", ["ngRoute"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/menu2", {
      templateUrl: "../partials/menu2.html",
      controller: "menu2Ctrl",
      controllerAs: "menu2Ctrl"
    });
  }])

  .controller("menu2Ctrl", ["$firebaseArray", "getCompounds", "$scope", "gameFactory", "preload",
   function($firebaseArray, getCompounds, $scope, gameFactory, preload) {
    
    var game = gameFactory;
    var canvas;
    console.log("game", game);
    game.state.add('menu2', {preload:preload, create:create});
    game.state.start('menu2');
    

    function create() {
      console.log("create");
      game.physics.startSystem(Phaser.Physics.ARCADE);

      game.add.sprite(900, 300);
      game.stage.backgroundColor = 0xEEE9BB;
      // game.add.sprite(game.world.x, game.world.y, 'background');
      // button = game.add.button(10, 20, 'beaker', startClick, this);
      // button.scale.setTo(1);
    }
  }]);

});