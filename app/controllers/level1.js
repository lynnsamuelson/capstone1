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
      var answerCounter = 0;
      var fullFormulaArray;
      var button;
      var goodJob;
      //console.log("game", game);

      game.state.add('level1', {preload:preload, create:create, update:update});
      
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
      
      // if (button) {
      //   button.destroy();
      //   button.events.removeAll();
      //   console.log("button Destoy activated");
        
      // }

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
      //console.log("anion box position", this.anionBox.position);

      //static empty box anchored to cation
      this.cationBox = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'cationBox');
      this.cationBox.position.x = 340;
      this.cationBox.position.y = 80;
      this.game.physics.arcade.enable(this.cationBox);
     //console.log("cation box position", this.cationBox.position);

      display.push(cation);
      display.push(anion);
      
      for (var i = 0; i < 200; i++) {
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
      // Generate Sprite 1
      var randomNum = Math.floor((Math.random() * display.length));
      // Just pull the string out into display1 var
      firstSprite = display.splice(randomNum, 1);
      firstSprite = firstSprite[0];
      // Create the sprite and set its location
      this.firstSprite = this.game.add.sprite(50, 150, firstSprite);

      //Generate Sprite 2
      randomNum = Math.floor((Math.random() * display.length));
      secondSprite = display.splice(randomNum, 1);
      secondSprite = secondSprite[0];
      // Create the sprite and set its location
      this.secondSprite = this.game.add.sprite(250, 150, secondSprite);

      //Generate Sprite 3
      randomNum = Math.floor((Math.random() * display.length));
      thirdSprite = display.splice(randomNum, 1);
      thirdSprite = thirdSprite[0];
      // Create the sprite and set its location
      this.thirdSprite = this.game.add.sprite(450, 150, thirdSprite);

      //Generate Sprite 4
      randomNum = Math.floor((Math.random() * display.length));
      forthSprite = display.splice(randomNum, 1);
      forthSprite = forthSprite[0];
      // Create the sprite and set its location
      this.forthSprite = this.game.add.sprite(650, 150, forthSprite);

      //Generate Sprite 5
      randomNum = Math.floor((Math.random() * display.length));
      fifthSprite = display.splice(randomNum, 1);
      fifthSprite = fifthSprite[0];
      // Create the sprite and set its location
      this.fifthSprite = this.game.add.sprite(50, 250, fifthSprite);

      //Generate Sprite 6
      randomNum = Math.floor((Math.random() * display.length));
      sixthSprite = display.splice(randomNum, 1);
      sixthSprite = sixthSprite[0];
      // Create the sprite and set its location
      this.sixthSprite = this.game.add.sprite(250, 250, sixthSprite);

      //Generate Sprite 7
      randomNum = Math.floor((Math.random() * display.length));
      seventhSprite = display.splice(randomNum, 1);
      seventhSprite = seventhSprite[0];
      // Create the sprite and set its location
      this.seventhSprite = this.game.add.sprite(450, 250, seventhSprite);

      //Generate Sprite 8
      randomNum = Math.floor((Math.random() * display.length));
      eighthSprite = display.splice(randomNum, 1);
      eighthSprite = eighthSprite[0];
      // Create the sprite and set its location
      this.eighthSprite = this.game.add.sprite(650, 250, eighthSprite);

      var sort = function(display1) {
        //console.log("display1 inside function", display1);
        //console.log("game.physics.arcade inside function", game.physics.arcade);
        // Enable physics on the sprite
        game.physics.arcade.enable(display1);
        // Let the user drag the sprite
        display1.inputEnabled = true;
        display1.input.enableDrag();


        // Module level variable to hold sprite position once dragged
        spriteOrigPos = {x:0, y:0};
        var _this = this;

        display1.events.onDragStart.add(function(currentSprite){
          spriteOrigPos.x = currentSprite.x;
          spriteOrigPos.y = currentSprite.y;
        }, this);


        // If it is a cation...
        if (display1.key === cation) {

          //console.log("we have a cation", display1.key);

          // When dragging stops call stopDrag() which determines what to do with sprite
          display1.key = this.cation;
          display1.events.onDragStop.add(function(currentSprite){
            //console.log("stopDrag position before stop drag", spriteOrigPos);
            stopDrag(currentSprite, this.cationBox);
          }, this);


        } else if (display1.key === anion) { 

          //console.log("we have an anion", display1.key);

          display1.key = this.anion;
          display1.events.onDragStop.add(function(currentSprite){
            //console.log("stopDrag position before stop drag", spriteOrigPos);
            //console.log("onDragStop entities", currentSprite, this.anionBox);
            stopDrag(currentSprite, this.anionBox);
          }, this);

        } else {
          //console.log("we have something strange", display1);

          display1.events.onDragStart.add(function(sprite) {
            //console.log("cation property", cation);
            //console.log("this.spriteOrigPos", this.spriteOrigPos);
          }, this);

          display1.events.onDragStop.add(function(currentSprite){
          bounceBack(currentSprite, this.spriteOrigPos);
          });
        }
      }.bind(this);

      sort(this.firstSprite);
      sort(this.secondSprite);
      sort(this.thirdSprite);
      sort(this.forthSprite);
      sort(this.fifthSprite);
      sort(this.sixthSprite);
      sort(this.seventhSprite);
      sort(this.eighthSprite);

      var bounceBack = function(currentSprite){
        var xNoMatch = (currentSprite.position.x !== spriteOrigPos.x);
        var yNoMatch = (currentSprite.position.y !== spriteOrigPos.y);

        if ( xNoMatch || yNoMatch ) {
          currentSprite.position.x = spriteOrigPos.x;
          currentSprite.position.y = spriteOrigPos.y;
        }
      }.bind(this);


      var stopDrag = function(currentSprite, endSprite){

        var disableDragging = function() {
          currentSprite.input.draggable = false; 
        };

        var theyOverlap = game.physics.arcade.overlap(currentSprite, endSprite);

        // If sprite not in correct pos, bounce back to where it started
        if ( theyOverlap ) {
          currentSprite.input.draggable = false;
          answerCounter++; 
          //console.log("they overlap");
        } else {
          bounceBack(currentSprite, spriteOrigPos);
          //console.log("they don't overlap");
        }
      }.bind(this);

      //var _this = this;
    }//closes the create function

    function update() {
      if (answerCounter > 1) {
        if(formulaArray.length > 1) {
          goodJob = game.add.text(330, 250, "Good Job");
          button = this.game.add.button(200, 200, 'button', nextProblem);
          button.scale.setTo(0.5);
          function nextProblem () {
             answerCounter = 0;
            game.state.start('level1');
          }
        } else {
            finished = game.add.text(200, 230, "Finished Level 1");
        }
      }
    }

  } //closes line 17
  ]);//closes line 16 
}); //closes line 6




























       