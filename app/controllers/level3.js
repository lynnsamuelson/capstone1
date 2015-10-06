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

      

      

      //static empty box anchored to anion
      // this.anionBox = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'anionBox');
      // this.anionBox.position.x = 735;
      // this.anionBox.position.y = 100;
      // this.game.physics.arcade.enable(this.anionBox);
      //console.log("anion box position", this.anionBox.position);

      //Coefficient Box for the anion
      // anionCounterBox = this.game.add.button(775, 120);
      // anionCounterBox.counter = 0;
      // anionCounterBox.inputEnabled = true;
      // anionCoefficient = game.add.text(775, 120, anionCounterBox.counter);
      // // anionCoefficient.scale.setTo(2);
      // anionCounterBox.events.onInputDown.add(tapCounterFunc, this);

      
      //static empty box anchored to cation
      // this.cationBox = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'cationBox');
      // this.cationBox.position.x = 665;
      // this.cationBox.position.y = 170;
      // this.game.physics.arcade.enable(this.cationBox);
     //console.log("cation box position", this.cationBox.position);

      //Coefficient Box for the cation
      // cationCounterBox = this.game.add.button(700, 185);
      // cationCounterBox.counter = 0;
      // cationCounterBox.inputEnabled = true;
      // cationCoefficient = game.add.text(705, 185, cationCounterBox.counter);
      // // cationCoefficient.scale.setTo(2);
      // cationCounterBox.events.onInputDown.add(tapCounterFunc, this);

      //reset button for the ion counters
      // resetBtn = this.game.add.button(775, 225);
      // resetBtn.inputEnabled = true;
      // restBtnText = game.add.text(775, 225, "reset");
      // resetBtn.events.onInputDown.add(resetCounterFunc, this);


     //choose a random equation from the database(stored in formulatArray)
      equation = equationArray.splice(Math.floor(Math.random()*equationArray.length),1);
      reactant1 = equation[0].reactant1;
      reactant2 = equation[0].reactant2;
      product1 = equation[0].product1;
      product2 = equation[0].product2;
        
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


      product1 = this.game.add.text(this.game.world.centerX, this.game.world.height, product1);
      product1.position.x = 600;
      product1.position.y = 110;

      if (product2 !== undefined) {
        plus = this.game.add.text(this.game.world.centerX, this.game.world.height, '+');
        plus.position.x = 675;
        plus.position.y = 110;

        product2 = this.game.add.text(this.game.world.centerX, this.game.world.height, product2);
        product2.position.x = 725;
        product2.position.y = 110;
      }

   }//closes the create function

    function update() {
       reactant1coefNum.text = reactant1coef.counter;
       reactant2coefNum.text = reactant2coef.counter;

      
    }//closes the update function

  } //closes line 17
  ]);//closes line 16 
}); //closes line 6




























       