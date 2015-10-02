define([
  "angular",
  "angularRoute",
  "firebase",
  "bootstrap", 
], function(angular, angularRoute, firebase, bootstrap) {
  angular.module("balanceItApp.gameCtrl", ["ngRoute"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/gameplay", {
      templateUrl: "../partials/gamePlay.html",
      controller: "gameCtrl",
      controllerAs: "game"
    });
  }])

  .controller("gameCtrl", ["$firebaseArray", "getCompounds", "$scope", function($firebaseArray, getCompounds, $scope) {

    var game = new Phaser.Game(900, 300, Phaser.CANVAS, "gameTarget", { preload: preload, create: create, update: update });
      
    
      //console.log("game", game);
      

      
    //});
  }]);
});    

