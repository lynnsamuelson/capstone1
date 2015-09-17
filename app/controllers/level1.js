define([
  "angular",
  "angularRoute",
  "firebase",
  "bootstrap", 
], function(angular, angularRoute, firebase, bootstrap) {
  angular.module("balanceItApp.level1", ["ngRoute"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/level1", {
      templateUrl: "../partials/level1.html",
      controller: "level1",
      controllerAs: "level1"
    });
  }])

  .controller("level1", ["$firebaseArray", "$scope", "$controller", "gameFactory", 
    function($firebaseArray, $scope, $controller, gameFactory) {
      console.log("found Level 1");
      
      
      //var game = gameFactory;
      //game.state.add('menu', {preload:preload, create:create});
      //game.state.add('levelOne', game.levelOne);


    //   game.LevelOne = function (game) { };
    //   game.LevelOne.prototype = {

    //     create: function () {},
    //     update: function () {},
    //     render: function () {},
    //     shutdown: function () {}

    // };


      
    //var menuScope = $scope.$new();
    //$controller('menuCtrl', {$scope : menuScope});
      //console.log(game.formulaArray);


    // function create() {
    //     this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //     game.add.sprite(game.world.x, game.world.y, 'background');

    //     //BEGIN adding SPRITES TO THE CANVAS


    //      //static chaning formula  compoundFormula
    //     // this.compoundFormula = this.game.add.sprite(this.game.world.centerX, this.game.world.height, ' compoundFormula');
    //     // this.compoundFormula.anchor.setTo(1.8, 5);  

    //     // //static arrow box
    //     this.arrows = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'arrows');
    //     this.arrows.anchor.setTo(1.8, 5); 

    //     //static Water box
    //     this.water = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'water');
    //     this.water.anchor.setTo(2.3, 5);
      
    //      //static NaCl box
    //     this.NaCl = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'NaCl');
    //     this.NaCl.anchor.setTo(3, 4);
        
    //     //static Cl box
    //     this.box = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'box');
    //     this.box.anchor.setTo(0.5, 4);

    //     //static Na box
    //     this.boxNa = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'boxNa');
    //     this.boxNa.anchor.setTo(-1, 4);

    //     //movable Cl box
    //     this.Cl = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'Cl');
    //     this.Cl.anchor.setTo(0.5, 2);
    //     this.game.physics.arcade.enable(this.box);
    //     this.game.physics.arcade.enable(this.Cl);
    //     this.Cl.inputEnabled = true;
    //     this.Cl.input.enableDrag();
    //     this.Cl.originalPosition = this.box.position.clone();


    //     //movable Na box
    //     this.Na = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'Na');
    //     this.Na.anchor.setTo(-1, 2.5);
    //     this.game.physics.arcade.enable(this.boxNa);
    //     this.game.physics.arcade.enable(this.Na);
    //     this.Na.inputEnabled = true;
    //     this.Na.input.enableDrag();
    //     this.Na.originalPosition = this.boxNa.position.clone();

    //     //END ADDING SPRITES TO THE PAGE

    //     //FUNCTION TO HANDLE THE DRAG AND DROP OF THE IONS
    //     var _this = this;

    //     function stopDrag(currentSprite, endSprite){
    //       var tophat = _this.game.physics.arcade.overlap(currentSprite, 
    //                                                     endSprite, 
    //                                                     function() {
    //                                                       currentSprite.input.draggable = false; 
    //                                                       //console.log("drug");
    //                                                     } );
    //       if ( !tophat ) {
    //         currentSprite.position.copyFrom(currentSprite.originalPosition);
    //       }
    //     }

    //     //CALLING THE DRAG FUNCTION FOR THE IONS OF CHOICE

    //     this.Cl.events.onDragStop.add(function(currentSprite){
    //       stopDrag(currentSprite, this.box);
    //     }, this);

    //     //anchors the Na box to the correct position in the equation
    //      this.Na.events.onDragStop.add(function(currentSprite){
    //       stopDrag(currentSprite, this.boxNa);
    //     }, this);
        
    //   }
  }]); 
}); 