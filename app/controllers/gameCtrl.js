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
      game.load.image("background", "images/beaker.png");
      game.load.image("Cl", "images/ClBox.jpg", 60, 59);
      game.load.spritesheet("Na", "images/NaPurple.jpg", 60, 59);
      game.load.spritesheet("NaCl", "images/NaClBox.jpg", 60, 59);
      game.load.spritesheet("box", "images/emptyBox.jpg", 60, 59);
      game.load.spritesheet("boxNa", "images/emptyBox.jpg", 60, 59);


    }
    function create() {
      //this.game.state.start.('preload');
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      game.add.sprite(game.world.centerX, game.world.centerY, 'background');


       //static NaCl box
      this.NaCl = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'NaCl');
      this.NaCl.anchor.setTo(3, 4);
      
      //static Cl box
      this.box = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'box');
      this.box.anchor.setTo(0.5, 4);

      //static Na box
      this.boxNa = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'boxNa');
      this.boxNa.anchor.setTo(-1, 4);

      //movable Cl box
      this.Cl = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'Cl');
      this.Cl.anchor.setTo(.5, 2);
      this.game.physics.arcade.enable(this.box);
      this.game.physics.arcade.enable(this.Cl);
      this.Cl.inputEnabled = true;
      this.Cl.input.enableDrag();
      this.Cl.originalPosition = this.box.position.clone();


      //movable Na box
      this.Na = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'Na');
      this.Na.anchor.setTo(-1, 2.5);
      this.game.physics.arcade.enable(this.boxNa);
      this.game.physics.arcade.enable(this.Na);
      this.Na.inputEnabled = true;
      this.Na.input.enableDrag();
      this.Na.originalPosition = this.boxNa.position.clone();

      
      var _this = this;

      function stopDrag(currentSprite, endSprite){
        var tophat = _this.game.physics.arcade.overlap(currentSprite, 
                                                      endSprite, 
                                                      function() {
                                                        currentSprite.input.draggable = false; 
                                                        console.log("drug")
                                                        //currentSprite.position.copyFrom(endSprite.position); 
                                                        //currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y);
                                                        //currentSprite = endSprite;
                                                        //endSprite.anchor.setTo(currentSprite.originalPosition.x, currentSprite.originalPosition.y);
                                                        //endSprite.anchor.setTo(0, 0);

                                                      } );
        if ( !tophat ) {
          currentSprite.position.copyFrom(currentSprite.originalPosition);
        }
      }

      this.Cl.events.onDragStop.add(function(currentSprite){
        stopDrag(currentSprite, this.box);
      }, this);

      //anchors the Na box to the correct position in the equation
       this.Na.events.onDragStop.add(function(currentSprite){
        stopDrag(currentSprite, this.boxNa);
      }, this);
      
    }
    function update() {

    }
  }]);
});    

