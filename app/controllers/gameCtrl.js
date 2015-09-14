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
      game.load.spritesheet("NaCl", "images/NaCl.jpg", 60, 59);

    }
    function create() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

       //static box
      this.NaCl = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'Cl');
      this.NaCl.anchor.setTo(3.5, 4);
      
      //static box
      this.Cl = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'Cl');
      this.Cl.anchor.setTo(0.5, 4);

      //movable Cl box
      this.game.physics.arcade.enable(this.Cl);
      this.ClCopy = this.game.add.sprite(this.game.world.centerX, 200, this.Cl.key, this.Cl.frame);
      this.ClCopy.anchor.x = 0.5;

      this.game.physics.arcade.enable(this.ClCopy);
      this.ClCopy.inputEnabled = true;
      this.ClCopy.input.enableDrag();
      this.ClCopy.originalPosition = this.ClCopy.position.clone();

      //static Na box
      this.Na = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'Na');
      this.Na.anchor.setTo(-1, 4);

      //movable Na box
      this.game.physics.arcade.enable(this.Na);
      this.NaCopy = this.game.add.sprite(this.game.world.centerX, 200, this.Na.key, this.Na.frame);
      this.NaCopy.anchor.x = -1;
      this.game.physics.arcade.enable(this.NaCopy);
      this.NaCopy.inputEnabled = true;
      this.NaCopy.input.enableDrag();
      this.NaCopy.originalPosition = this.NaCopy.position.clone();





      
      var _this = this;

      function stopDrag(currentSprite, endSprite){
        var tophat = _this.game.physics.arcade.overlap(currentSprite, 
                                                      endSprite, 
                                                      function() {
                                                        currentSprite.input.draggable = false; 
                                                        currentSprite.position.copyFrom(endSprite.position); 
                                                        currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
                                                      } )
        if ( !tophat ) {
          currentSprite.position.copyFrom(currentSprite.originalPosition);
        }
      }

      this.ClCopy.events.onDragStop.add(function(currentSprite){
        stopDrag(currentSprite, this.Cl);
        console.log("match");
      }, this);

       this.NaCopy.events.onDragStop.add(function(currentSprite){
        stopDrag(currentSprite, this.Na);
        console.log("match");
      }, this);
      
    }
    function update() {

    }
  }]);
});    

