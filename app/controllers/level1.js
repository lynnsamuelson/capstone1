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

  .controller("level1", ["$firebaseArray", "$scope", "$controller", "gameFactory", "preload", "getCompounds", 
    function($firebaseArray, $scope, $controller, gameFactory, preload, getCompounds) {
      //console.log("found Level 1");
      var game = gameFactory;
      var cation;
      var anion;
      var cationBox;
      var anionBox;
      var formula;
      var equation;
      var variables;
      var formulaArray = [];
      var display = [];

      //console.log("game", game);

      game.state.add('level1', {preload:preload, create:create});
      
      // getFormulaArray.getArray();
      // console.log("game.formulaArray", game.formulaArray);

      // console.log (compoundsFromFactory);
     getCompounds.goGetCompounds()
        .then(function (data) {
          angular.forEach (data, function (value) {
            formulaArray.push(value);
          });
          game.state.start('level1');
        });



    function create() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      game.add.sprite(game.world.x, game.world.y, 'background');

      //static arrow box
      this.arrows = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'arrows');
      this.arrows.anchor.setTo(2, 5); 

      //static Water box
      this.water = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'water');
      this.water.anchor.setTo(2.2, 5);

      equation = formulaArray.splice(Math.floor(Math.random()*formulaArray.length),1);
      anion = equation[0].anion;
      cation = equation[0].cation;
      formula = equation[0].formula;
        
      //static box for the formula
      this.formula = this.game.add.sprite(this.game.world.centerX, this.game.world.height, formula);
      this.formula.anchor.setTo(2.7, 4);

      //static empty box anchored to anion
      this.anionBox = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'anionBox');
      this.anionBox.position.x = 550;
      this.anionBox.position.y = 65;
      this.game.physics.arcade.enable(this.anionBox);

      //static empty box anchored to cation
      this.cationBox = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'cationBox');
      this.cationBox.position.x = 340;
      this.cationBox.position.y = 80;
      this.game.physics.arcade.enable(this.cationBox);

      display.push(cation);
      display.push(anion);
      
      for (var i = 0; i < 10; i++) {
        if (display.length < 8) {
          theRandomIon = game.rnd.pick(formulaArray);
          if (display.indexOf(theRandomIon.anion) == -1){
            display.push(theRandomIon.anion);
          } 
          if (display.indexOf(theRandomIon.cation) == -1) {
            display.push(theRandomIon.cation);
          }
        }
      }

      var randomNum = Math.floor((Math.random() * display.length));

      // Just pull the string out into display1 var
      display1 = display.splice(randomNum, 1);
      display1 = display1[0];
      console.log("display1", display1);

      // Create the sprite and set its location
      this.display1 = this.game.add.sprite(50, 200, display1);

      // Enable physics on the sprite
      this.game.physics.arcade.enable(this.display1);

      // Let the user drag the sprite
      this.display1.inputEnabled = true;
      this.display1.input.enableDrag();

      var _this = this;

      // Module level variable to hold sprite position once dragged
      this.spriteOrigPos = {x:0, y:0};

      this.display1.events.onDragStart.add(function(currentSprite){
        this.spriteOrigPos.x = currentSprite.x;
        this.spriteOrigPos.y = currentSprite.y;
      }, this);

      var bounceBack = function(currentSprite){
        var xNoMatch = (currentSprite.position.x !== this.spriteOrigPos.x);
        var yNoMatch = (currentSprite.position.y !== this.spriteOrigPos.y);

        if ( xNoMatch || yNoMatch ) {
          currentSprite.position.x = this.spriteOrigPos.x;
          currentSprite.position.y = this.spriteOrigPos.y;
        }
      }.bind(this);

      var stopDrag = function(currentSprite, endSprite){
        var disableDragging = function() {
          currentSprite.input.draggable = false; 
        };

        var theyOverlap = _this.game.physics.arcade.overlap(endSprite, currentSprite);

        // If sprite not in correct pos, bounce back to where it started
        if ( theyOverlap ) {
          currentSprite.input.draggable = false; 
        } else {
          bounceBack(currentSprite, this.spriteOrigPos);
        }
      }.bind(this);


      // If it is a cation...
      if (display1 === cation) {

        console.log("we have a cation", this.display1);

        // When dragging stops call stopDrag() which determines what to do with sprite
        this.display1.events.onDragStop.add(function(currentSprite){
          stopDrag(currentSprite, this.cationBox);
        }, this);


      } else if (display1 === anion) { 

        console.log("we have an anion", this.display1);

        this.display1.events.onDragStop.add(function(currentSprite){
          console.log("stopDrag positions",currentSprite.position, this.anionBox.position);
          stopDrag(currentSprite, this.anionBox);
        }, this);

      } else {
        console.log("we have something strange", display1);

        this.display1.events.onDragStart.add(function(sprite) {
          console.log("cation property", cation);
          console.log("this.spriteOrigPos", this.spriteOrigPos);
        }, this);

        this.display1.events.onDragStop.add(function(currentSprite){
        bounceBack(currentSprite, this.spriteOrigPos);
        }, this);
      }

  } //closes line 17
  ]);//closes line 16 
}); //closes line 6




























       