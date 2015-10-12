define([
  "angular",
  "angularRoute",
  "firebase",
  "bootstrap", 
], function(angular, angularRoute, firebase, bootstrap) {
  angular.module("balanceItApp.level3", ["ngRoute"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/level3", {
      templateUrl: "../partials/level3.html",
      controller: "level3",
      controllerAs: "level3"
    });
  }])

  .controller("level3", ["$firebaseArray", "$scope", "$controller", "gameFactory", "preload", "getEquations", 
    function($firebaseArray, $scope, $controller, gameFactory, preload, getEquations) {
      //console.log("found Level 1");
      var game = gameFactory;
      var cation;
      var anion;
      var cationBox;
      var anionBox;
      var resetBtn;
      var restBtnText;
      var formula;
      var equation;
      var variables;
      var equationArray = [];
      var display = [];
      var answerCounter = 0;
      var fullFormulaArray;
      var button;
      var plus;
      var goodJob;
      var theRandomIon;
      var reactant1coef = 0;
      var reactant2coef = 0;
      var product1coef = 0;
      var anionCounter = 0;
      var anionCounter = 0;
      var cationCoefficient;
      var problemCounter = 0;
      console.log("game", game);


      game.state.add('level3', {preload:preload, create:create, update:update});
      
     getEquations.goGetEquations()
        .then(function (data) {
          angular.forEach (data, function (value) {
            equationArray.push(value);
            console.log("equationArray", equationArray);
          });
          game.state.start('level3');
        });

    function create() {
     
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      game.add.sprite(game.world.x, game.world.y, 'background');

      //function that does the counting for the coefficient boxes
      function tapCounterFunc(tapCounter){
        tapCounter.counter++;
      }

      function resetCounterFunc(tapCounter){
        anionCounterBox.counter = 0;
        cationCounterBox.counter = 0;
      }

      //static arrow box
      this.arrows = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'arrows');
      this.arrows.position.x = 475;
      this.arrows.position.y = 110;
      this.arrows.scale.setTo(0.4);

     //choose a random equation from the database(stored in formulatArray)
      equation = equationArray.splice(Math.floor(Math.random()*equationArray.length),1);
      reactant1 = equation[0].reactant1;
      reactant2 = equation[0].reactant2;
      product1 = equation[0].product1;
      product2 = equation[0].product2;
      rct1Coef = equation[0].reactant1Coef;
      rct2Coef = equation[0].reactant2Coef;
      prdt1Coef = equation[0].product1Coef;
      prd2Coef = equation[0].product2Coef;

      //Add the first reactant to the DOM
      reactant1 = this.game.add.text(this.game.world.centerX, this.game.world.height, reactant1);
      reactant1.position.x = 300;
      reactant1.position.y = 110;
      this.game.physics.arcade.enable(reactant1);

      //coefficient box for reactant1
      reactant1coef = this.game.add.button(275, 110);
      reactant1coef.counter = 0;
      reactant1coef.inputEnabled = true;
      reactant1coefNum = game.add.text(275, 110, reactant1coef.counter);
      reactant1coef.events.onInputDown.add(tapCounterFunc, this);


      plus = this.game.add.text(this.game.world.centerX, this.game.world.height, '+');
      plus.position.x = 350;
      plus.position.y = 110;

      reactant2 = this.game.add.text(this.game.world.centerX, this.game.world.height, reactant2);
      reactant2.position.x = 400;
      reactant2.position.y = 110; 

      //coefficient box for reactant1
      reactant2coef = this.game.add.button(375, 110);
      reactant2coef.counter = 0;
      reactant2coef.inputEnabled = true;
      reactant2coefNum = game.add.text(375, 110, reactant2coef.counter);
      reactant2coef.events.onInputDown.add(tapCounterFunc, this);

      //coefficient box for procuct1
      product1 = this.game.add.text(this.game.world.centerX, this.game.world.height, product1);
      product1.position.x = 600;
      product1.position.y = 110;

      //coefficient box for product1
      product1coef = this.game.add.button(575, 110);
      product1coef.counter = 0;
      product1coef.inputEnabled = true;
      product1coefNum = game.add.text(575, 110, product1coef.counter);
      product1coef.events.onInputDown.add(tapCounterFunc, this);

      if (product2 !== undefined) {
        plus = this.game.add.text(this.game.world.centerX, this.game.world.height, '+');
        plus.position.x = 675;
        plus.position.y = 110;

        product2 = this.game.add.text(this.game.world.centerX, this.game.world.height, product2);
        product2.position.x = 725;
        product2.position.y = 110;

        //coefficient box for product1
        product2coef = this.game.add.button(575, 110);
        product2coef.counter = 0;
        product2coef.inputEnabled = true;
        product2coefNum = game.add.text(575, 110, product2coef.counter);
        product2coef.events.onInputDown.add(tapCounterFunc, this);
        console.log("product1coef", product2coef.counter);
        }

   }//closes the create function

    function update() {
       reactant1coefNum.text = reactant1coef.counter;
       reactant2coefNum.text = reactant2coef.counter;
       product1coefNum.text = product1coef.counter;
       if (product2 !== undefined) { 
         product2coefNum.text = product2coef.counter;
       }

       function nextProblem () {
        answerCounter = 0;
        game.state.start('level3');
      }
      //logic to determine if the coeffients are correct.  Differers for 1 or 2 products
       if (product2 !== undefined) { 
         if (rct1Coef === reactant1coef.counter && rct2Coef === reactant2coef.counter
          && prdt1Coef === product1coef.counter && prdt2Coef === product2coef.counter) {
          //problemCounter sets the number of problems to finish
         if(problemCounter < 10) {
            goodJob = game.add.text(500, 145, "Good Job");
            button = this.game.add.button(500, 175, 'stirbar', nextProblem);
            button.scale.setTo(2);
          //after doing all the set # of problems, the else finishes level 1
          } else {
              finished = game.add.text(450, 145, "Finished Level 3!");
          }
        }
      } else {
        if (rct1Coef === reactant1coef.counter && rct2Coef === reactant2coef.counter
          && prdt1Coef === product1coef.counter) {
          //problemCounter sets the number of problems to finish
         if(problemCounter < 10) {
            goodJob = game.add.text(500, 145, "Good Job");
            button = this.game.add.button(500, 175, 'stirbar', nextProblem);
            button.scale.setTo(2);
          //after doing all the set # of problems, the else finishes level 1
          } else {
              finished = game.add.text(450, 145, "Finished Level 3!");
          }
        }
      }

    }//closes the update function

  } //closes line 17
  ]);//closes line 16 
}); //closes line 6




























       