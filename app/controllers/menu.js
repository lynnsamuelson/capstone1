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

  .controller("menuCtrl", ["$firebaseArray", "getCompounds", "$scope", "gameFactory", function($firebaseArray, getCompounds, $scope, gameFactory) {

    var game = gameFactory;
    game.state.add('menu', {preload:preload, create:create});
    game.state.start('menu');
    //{ preload: preload, create: create, update: update }
    var compoundsFromFactory = getCompounds.goGetCompounds();
    
    function preload() {
      this.scale.pageAlignHorizontally = true;
      game.load.image("background", "images/testTubes.jpg");
      game.load.spritesheet("Br", "images/Br.png", 112, 59);
      game.load.image("Cl", "images/Cl.png  ", 112, 61);
      game.load.image("Li", "images/Li.jpg  ", 112, 61);
      game.load.image("LiBr", "images/LiBr.png  ", 149, 60);
      game.load.image("LiCl", "images/LiCl.png  ", 149, 60);
      game.load.image("Mg", "images/Mg.jpg  ", 112, 59);
      game.load.image("MgBr2", "images/MgBr2.png  ", 149, 60);
      game.load.image("MgCl2", "images/MgCl2.jpg  ", 149, 60);
      game.load.image("MgSO4", "images/MgSO4.jpg  ", 149, 60);
      game.load.spritesheet("Na", "images/Na.jpg", 113, 61);
      game.load.spritesheet("Na2SO4", "images/Na2SO4.png", 149, 60);
      game.load.spritesheet("NaBr", "images/NaBr.jpg", 149, 60);
      game.load.spritesheet("NaCl", "images/NaCl.jpg", 149, 60);
      game.load.spritesheet("SO4", "images/SO4.jpg", 112, 59);
      game.load.spritesheet("arrows", "images/arrows.jpg", 112, 59);
      game.load.spritesheet("beaker", "images/beaker.jpg", 149, 60);
      game.load.spritesheet("box", "images/emptyBox.jpg", 112, 59);
      game.load.spritesheet("boxNa", "images/emptyBox.jpg", 112, 59);
      game.load.spritesheet("water", "images/water.jpg", 112, 59);
      

      game.formulaArray = [];
      compoundsFromFactory.then (function(data) {
        angular.forEach (data, function (value) {
          console.log("value", value);
          game.formulaArray.push(value);
        });
      });
    }

    function create() {
      console.log("create");
      game.physics.startSystem(Phaser.Physics.ARCADE);

      game.add.sprite(game.world.x, game.world.y, 'background');
      // button = game.add.button(50, 275, 'start', startClick, this);
      // button.scale.setTo(.5);
    }
   //create();
  }]);

});