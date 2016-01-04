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
      var Equation = [];
      var equationArray = [];
      var display = [];
      var answerCounter = 0;
      var fullFormulaArray;
      var button;
      var plus;
      var goodJob;
      var theRandomIon;
      var reactant1coefNum;
      var reactant1;
      var reactant2coefNum;
      var reactant2;
      var procuct1;
      var prdt1Coef;
      var product1coefNum;
      var procuct2;
      var prdt2Coef;
      var product2coefNum;
      var reactant1coef = 0;
      var reactant2coef= 0;
      var product1coef = 0;
      var product2coef = 0;
      var product3coef = 0;
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
      this.arrows.position.x = 280;
      this.arrows.position.y = 140;
      this.arrows.scale.setTo(0.4);

     //choose a random equation from the database(stored in formulatArray)
      equation = equationArray.splice(Math.floor(Math.random()*equationArray.length),1);
      reactant1 = equation[0].reactant1;
      reactant2 = equation[0].reactant2;
      product1 = equation[0].product1;
      product2 = equation[0].product2;
      product3 = equation[0].product3;
      rct1Coef = equation[0].reactant1Coef;
      rct2Coef = equation[0].reactant2Coef;
      prdt1Coef = equation[0].product1Coef;
      prd2Coef = equation[0].product2Coef;
      prd3Coef = equation[0].product3Coef;

      
      

      // //Add the first reactant to the DOM
      x = 265;
      y = 100;

      //coefficient box for reactant1
      reactant1coef = this.game.add.button(265, 100);
      reactant1coef.counter = 0;
      reactant1coef.inputEnabled = true;
      reactant1coefNum = game.add.text(265, 100, reactant1coef.counter);
      reactant1coef.events.onInputDown.add(tapCounterFunc, this);


      for (var i=0; i<reactant1.length; i++) {
          var formulaArrayLoop = reactant1[i];
          var x = x + 20;
          
          if (formulaArrayLoop === "1" || formulaArrayLoop === "2" || formulaArrayLoop === "3" || formulaArrayLoop === "4" || formulaArrayLoop === "5" || formulaArrayLoop === "6" || formulaArrayLoop === "7" || formulaArrayLoop === "8" || formulaArrayLoop == "9" || formulaArrayLoop == "0" ) {
            formulaArrayLoop = this.game.add.text(this.game.world.centerX, this.game.world.height, reactant1[i]);
            y = y + 15;
            formulaArrayLoop.position.x = x;
            formulaArrayLoop.position.y = y;
            formulaArrayLoop.scale.setTo(.75);
            y = 100;

          } else {
            formulaArrayLoop = this.game.add.text(this.game.world.centerX, this.game.world.height, reactant1[i]);
            formulaArrayLoop.position.x = x;
            formulaArrayLoop.position.y = y;
            this.game.physics.arcade.enable(formulaArrayLoop);
          }
        }
      
      if (reactant2 !== undefined) {
        x = x + 20;
        plus = this.game.add.text(this.game.world.centerX, this.game.world.height, '+');
        plus.position.x = x;
        plus.position.y = 100;

        x = x + 20;

        //coefficient box for reactant1
        reactant2coef = this.game.add.button(x, 100);
        reactant2coef.counter = 0;
        reactant2coef.inputEnabled = true;
        reactant2coefNum = game.add.text(x, 100, reactant2coef.counter);
        reactant2coef.events.onInputDown.add(tapCounterFunc, this);

        for (var i=0; i<reactant2.length; i++) {
          var formulaArrayLoop = reactant2[i];
          var x = x + 20;
          
          if (formulaArrayLoop === "1" || formulaArrayLoop === "2" || formulaArrayLoop === "3" || formulaArrayLoop === "4" || formulaArrayLoop === "5" || formulaArrayLoop === "6" || formulaArrayLoop === "7" || formulaArrayLoop === "8" || formulaArrayLoop == "9" || formulaArrayLoop == "0" ) {
            formulaArrayLoop = this.game.add.text(this.game.world.centerX, this.game.world.height, reactant2[i]);
            y = y + 15;
            formulaArrayLoop.position.x = x;
            formulaArrayLoop.position.y = y;
            formulaArrayLoop.scale.setTo(.75);
            y = 100;

          } else {
            formulaArrayLoop = this.game.add.text(this.game.world.centerX, this.game.world.height, reactant2[i]);
            formulaArrayLoop.position.x = x;
            formulaArrayLoop.position.y = y;
            this.game.physics.arcade.enable(formulaArrayLoop);
          }
        }
      }

      var a = 390;
      var b = 140;
      //coefficient box for product1
      product1coef = this.game.add.button(370, 140);
      product1coef.counter = 0;
      product1coef.inputEnabled = true;
      product1coefNum = game.add.text(370, 140, product1coef.counter);
      product1coef.events.onInputDown.add(tapCounterFunc, this);

      for (var i=0; i<product1.length; i++) {
          var formulaArrayLoop = product1[i];
          var a = a + 20;
          
          if (formulaArrayLoop === "1" || formulaArrayLoop === "2" || formulaArrayLoop === "3" || formulaArrayLoop === "4" || formulaArrayLoop === "5" || formulaArrayLoop === "6" || formulaArrayLoop === "7" || formulaArrayLoop === "8" || formulaArrayLoop == "9" || formulaArrayLoop == "0" ) {
            formulaArrayLoop = this.game.add.text(this.game.world.centerX, this.game.world.height, product1[i]);
            b = b + 15;
            formulaArrayLoop.position.x = a;
            formulaArrayLoop.position.y = b;
            formulaArrayLoop.scale.setTo(.75);
            b = 140;

          } else {
           
            formulaArrayLoop = this.game.add.text(this.game.world.centerX, this.game.world.height, product1[i]);
            formulaArrayLoop.position.x = a;
            formulaArrayLoop.position.y = b;
            this.game.physics.arcade.enable(formulaArrayLoop);
          }
        }

      //coefficient box for procuct1
      // product1 = this.game.add.text(this.game.world.centerX, this.game.world.height, product1);
      // product1.position.x = 390;
      // product1.position.y = 140;

      if (product2 !== undefined) {
        console.log("product2", product2);

        a = a + 20;

        plus = this.game.add.text(this.game.world.centerX, this.game.world.height, '+');
        plus.position.x = a;
        plus.position.y = 140;

        a = a + 20;

        //coefficient box for product2
        product2coef = this.game.add.button(a, 140);
        product2coef.counter = 0;
        product2coef.inputEnabled = true;
        product2coefNum = game.add.text(a, 140, product2.counter);
        product2coef.events.onInputDown.add(tapCounterFunc, this);

        for (var i=0; i<product2.length; i++) {
          var formulaArrayLoop = product2[i];
          var a = a + 20;
          
          if (formulaArrayLoop === "1" || formulaArrayLoop === "2" || formulaArrayLoop === "3" || formulaArrayLoop === "4" || formulaArrayLoop === "5" || formulaArrayLoop === "6" || formulaArrayLoop === "7" || formulaArrayLoop === "8" || formulaArrayLoop == "9" || formulaArrayLoop == "0" ) {
            formulaArrayLoop = this.game.add.text(this.game.world.centerX, this.game.world.height, product2[i]);
            b = b + 15;
            formulaArrayLoop.position.x = a;
            formulaArrayLoop.position.y = b;
            formulaArrayLoop.scale.setTo(.75);
            b = 140;

          } else {
            formulaArrayLoop = this.game.add.text(this.game.world.centerX, this.game.world.height, product2[i]);
            formulaArrayLoop.position.x = a;
            formulaArrayLoop.position.y = b;
            this.game.physics.arcade.enable(formulaArrayLoop);

          }
        }
      }


      if (product3 !== undefined) {
        a = a + 20;

        plus = this.game.add.text(this.game.world.centerX, this.game.world.height, '+');
        plus.position.x = a;
        plus.position.y = 140;

        a = a + 20;

        //coefficient box for product3
        product3coef = this.game.add.button(a, 140);
        product3coef.counter = 0;
        product3coef.inputEnabled = true;
        product3coefNum = game.add.text(a, 140, product3.counter);
        product3coef.events.onInputDown.add(tapCounterFunc, this);

        for (var i=0; i<product3.length; i++) {
          console.log("product3", product3);
          var formulaArrayLoop = product3[i];
          var a = a + 20;
          
          if (formulaArrayLoop === "1" || formulaArrayLoop === "2" || formulaArrayLoop === "3" || formulaArrayLoop === "4" || formulaArrayLoop === "5" || formulaArrayLoop === "6" || formulaArrayLoop === "7" || formulaArrayLoop === "8" || formulaArrayLoop == "9" || formulaArrayLoop == "0" ) {
            formulaArrayLoop = this.game.add.text(this.game.world.centerX, this.game.world.height, product3[i]);
            b = b + 15;
            formulaArrayLoop.position.x = a;
            formulaArrayLoop.position.y = b;
            formulaArrayLoop.scale.setTo(.75);
            b = 140;

          } else {
            formulaArrayLoop = this.game.add.text(this.game.world.centerX, this.game.world.height, product3[i]);
            formulaArrayLoop.position.x = a;
            formulaArrayLoop.position.y = b;
            this.game.physics.arcade.enable(formulaArrayLoop);
          }
        }
      }
   }//closes the create function





      // if (product3 !== undefined) {
      //   plus = this.game.add.text(this.game.world.centerX, this.game.world.height, '+');
      //   plus.position.x = 675;
      //   plus.position.y = 110;

      //   product3 = this.game.add.text(this.game.world.centerX, this.game.world.height, product3);
      //   product3.position.x = 725;
      //   product3.position.y = 110;

      //   //coefficient box for product1
      //   product3coef = this.game.add.button(575, 110);
      //   product3coef.counter = 0;
      //   product3coef.inputEnabled = true;
      //   product3coefNum = game.add.text(575, 110, product3coef.counter);
      //   product3coef.events.onInputDown.add(tapCounterFunc, this);
      //   console.log("product3coef", product3coef.counter);
      // }

    function update() {
       reactant1coefNum.text = reactant1coef.counter;
       if (reactant2 !== undefined) { 
         reactant2coefNum.text = reactant2coef.counter;
       }
       product1coefNum.text = product1coef.counter;

         if(product2 !== undefined) {
           product2coefNum.text = product2coef.counter;
         }
       if (product3 !== undefined) { 
         product3coefNum.text = product3coef.counter;
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




























       