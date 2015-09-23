define([
  "angular",
  "angularRoute",
  "firebase",
  "bootstrap", 
], function(angular, angularRoute, firebase, bootstrap) {
  angular.module("balanceItApp.level2", ["ngRoute"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/level2", {
      templateUrl: "../partials/level2.html",
      controller: "level2",
      controllerAs: "level2"
    });
  }])

  .controller("level2", ["$firebaseArray", "$scope", "$controller", "gameFactory", "preload", "getCompounds", 
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
      var theRandomIon;
      var cationCounter = 0;
      var anionCounter = 0;
      var cationCoefficient;
      var problemCounter = 0;
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
      
      //function that does the counting for the coefficient boxes
      function tapCounterFunc(tapCounter){
        tapCounter.counter++;
      }
      //Coefficient Box for the cation
      cationCounterBox = this.game.add.button(300, 80, 'grayBox');
      cationCounterBox.counter = 0;
      cationCounterBox.inputEnabled = true;
      cationCoefficient = game.add.text(310, 78, cationCounterBox.counter);
      cationCoefficient.scale.setTo(2);
      cationCounterBox.events.onInputDown.add(tapCounterFunc, this);

      //Coefficient Box for the anion
      anionCounterBox = this.game.add.button(550, 80, 'grayBox');
      anionCounterBox.counter = 0;
      anionCounterBox.inputEnabled = true;
      anionCoefficient = game.add.text(560, 78, anionCounterBox.counter);
      anionCoefficient.scale.setTo(2);
      anionCounterBox.events.onInputDown.add(tapCounterFunc, this);

      

      //static arrow box
      this.arrows = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'arrows');
      this.arrows.anchor.setTo(2, 5); 

      //static Water box
      this.water = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'water');
      this.water.anchor.setTo(2.2, 5);

      //static empty box anchored to anion
      this.anionBox = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'anionBox');
      this.anionBox.position.x = 600;
      this.anionBox.position.y = 80;
      this.game.physics.arcade.enable(this.anionBox);
      //console.log("anion box position", this.anionBox.position);

      //static empty box anchored to cation
      this.cationBox = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'cationBox');
      this.cationBox.position.x = 360;
      this.cationBox.position.y = 80;
      this.game.physics.arcade.enable(this.cationBox);
     //console.log("cation box position", this.cationBox.position);

     //choose a random equation from the database(stored in formulatArray)
      equation = formulaArray.splice(Math.floor(Math.random()*formulaArray.length),1);
      anion = equation[0].anion;
      cation = equation[0].cation;
      formula = equation[0].formula;
      anionCoeffNum = equation[0].anionCoefficient;
      cationCoeffNum = equation[0].cationCoefficient;

        
      //Add the chosen formula to the DOM
      this.formula = this.game.add.sprite(this.game.world.centerX, this.game.world.height, formula);
      this.formula.anchor.setTo(2.7, 4);


      //Make an array of the 2 correct ions and 6 random ions to be used as choices
      display.push(cation);
      display.push(anion);

      /*builds an array from the ions in the database without duplicating any of the ions.
        Should be ~ half anios and half cations.*/
      for (var i = 0; i < 2000; i++) {
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

      // Displays the 2 answers and the 6 random ions onto the DOM
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

      /*controlls the response of the drag and drop.  
      Only the correct answers are allowed to stay in the box*/
      var sort = function(display1) {
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


        // If it is the correct cation.
        if (display1.key === cation) {

          // When dragging stops call stopDrag() which determines what to do with sprite
          display1.key = this.cation;
          display1.events.onDragStop.add(function(currentSprite){
            //console.log("stopDrag position before stop drag", spriteOrigPos);
            stopDrag(currentSprite, this.cationBox);
          }, this);


        // If it is the correct anion.
        } else if (display1.key === anion) { 

          display1.key = this.anion;
          display1.events.onDragStop.add(function(currentSprite){
            stopDrag(currentSprite, this.anionBox);
          }, this);
        //if it is an incorrect ion
        } else {

          display1.events.onDragStart.add(function(sprite) {
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

        // If sprite in not in correct pos, bounce back to where it started
        if ( theyOverlap ) {
          currentSprite.input.draggable = false;
          answerCounter++; 
        } else {
          bounceBack(currentSprite, spriteOrigPos);
        }
      }.bind(this);

      problemCounter++;
      console.log("problemCounter", problemCounter);

    }//closes the create function

    function update() {
      cationCoefficient.text = cationCounterBox.counter;
      anionCoefficient.text = anionCounterBox.counter;
      function nextProblem () {
        answerCounter = 0;
        game.state.start('level1');
      }
      //answerCounter runs when both ions are in the correct place and the coefficients are correct
      if (answerCounter > 1 && 
        cationCounterBox.counter === cationCoeffNum && 
        anionCounterBox.counter === anionCoeffNum) {
        //problemCounter sets the number of problems to finish
       if(problemCounter < 10) {
          goodJob = game.add.text(330, 250, "Good Job");
          button = this.game.add.button(200, 200, 'button', nextProblem);
          button.scale.setTo(0.5);
        //after doing all the set # of problems, the else finishes level 1
        } else {
            finished = game.add.text(200, 230, "Finished Level 1");
        }
      }
    }

  } //closes line 17
  ]);//closes line 16 
}); //closes line 6




























       