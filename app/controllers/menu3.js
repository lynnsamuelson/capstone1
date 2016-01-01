define([
  "angular",
  "angularRoute",
  "firebase",
  "bootstrap", 
], function(angular, angularRoute, firebase, bootstrap) {
  angular.module("balanceItApp.menu3", ["ngRoute"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/menu3", {
      templateUrl: "../partials/menu3.html",
      controller: "menu3Ctrl",
      controllerAs: "menu3Ctrl"
    });
    console.log("ding");
  }])
  .controller("menu3Ctrl", ["$firebaseArray", "getCompounds", "$scope", "gameFactory", "preload",
   function($firebaseArray, getCompounds, $scope, gameFactory, preload) {
    
    var game = gameFactory;
    var canvas;
    console.log("game", game);
    game.state.add('menu3', {preload:preload, create:create});
    game.state.start('menu3');
    

    function create() {
      console.log("create menu3Ctrl");
      game.physics.startSystem(Phaser.Physics.ARCADE);

      game.add.sprite(900, 300);
      game.stage.backgroundColor = 0xEEE9BB;
      // game.add.sprite(game.world.x, game.world.y, 'background');
      // button = game.add.button(10, 20, 'beaker', startClick, this);
      // button.scale.setTo(1);
    }
  }]);

});