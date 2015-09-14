define([
  "angular",
  "angularRoute",
  "firebase",
  "bootstrap", 
], function(angular, angularRoute, firebase, bootstrap) {
  angular.module("balanceItApp.gameCtrl", ["ngRoute"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/game", {
      templateUrl: "../partials/game.html",
      controller: "gameCtrl",
      controllerAs: "game"
    });
  }])

  .controller("gameCtrl", ["$firebaseArray", function($firebaseArray) {
    console.log("got to game");

    var ions = new Firebase("https://balanceit.firebaseio.com/Compounds");
    console.log("firebase", ions);

    var game = new Phaser.Game(480, 320, Phaser.AUTO, "gameTarget", { preload: preload, create: create, update: update });
    //console.log("game", game);
    function preload() {
      this.scale.pageAlignHorizontally = true;
      game.load.spritesheet("Cl", "images/Cl.jpg", 60, 59);
      game.load.spritesheet("Na", "images/Na.jpg", 60, 59);
      //this.game.load.image('Cl', Cl);
      //this.game.load.image('Na', flechaURI);

    }
    function create() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.Cl = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'Cl');
      this.Cl.anchor.setTo(0.5, 1);
      this.game.physics.arcade.enable(this.Cl);
      this.Cl.tint= 0xff00ff;
      
      this.ClCopy = this.game.add.sprite(this.game.world.centerX, 0, this.Cl.key, this.Cl.frame);
      this.ClCopy.anchor.x = 0.5;
      this.game.physics.arcade.enable(this.ClCopy);
      this.ClCopy.inputEnabled = true;
      this.ClCopy.input.enableDrag();
      this.ClCopy.originalPosition = this.ClCopy.position.clone();
      function  stopDrag(currentSprite, endSprite){
        if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function() {
          currentSprite.input.draggable = false;
          currentSprite.position.copyFrom(endSprite.position); 
          currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
        })) { currentSprite.position.copyFrom(currentSprite.originalPosition);
        }
      }
      this.ClCopy.events.onDragStop.add(function(currentSprite){
        this.stopDrag(currentSprite, this.Cl);
      }, this);
      
      this.Na = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'Na');
      this.Na.anchor.set(0.5);
    }
    function update() {

    }
  }]);
});    