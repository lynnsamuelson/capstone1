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
      //console.log("anion", anion);
        
      //static box for the formula
      this.formula = this.game.add.sprite(this.game.world.centerX, this.game.world.height, formula);
      this.formula.anchor.setTo(2.7, 4);

      //static empty box anchored to anion
      this.anionBox = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'anionBox');
      this.anionBox.anchor.setTo(-1, 4);

      //movable anion 
      // this.anion = this.game.add.sprite(this.game.world.centerX, this.game.world.height, anion);
      // this.anion.anchor.setTo(-0.7, 2.3);
      // this.game.physics.arcade.enable(this.anionBox);
      // this.game.physics.arcade.enable(this.anion);
      // this.anion.inputEnabled = true;
      // this.anion.input.enableDrag();
      // this.anion.originalPosition = this.anionBox.position.clone();

      //static empty box anchored to cation
      this.cationBox = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'cationBox');
      this.cationBox.anchor.setTo(0.5, 4);

      // // //movable cation
      // this.cation = this.game.add.sprite(this.game.world.centerX, this.game.world.height, cation);
      // this.cation.anchor.setTo(0.4, 2.3);
      // this.game.physics.arcade.enable(this.cationBox);
      // this.game.physics.arcade.enable(this.cation);
      // this.cation.inputEnabled = true;
      // this.cation.input.enableDrag();
      // this.cation.originalPosition = this.cationBox.position.clone();

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
       console.log("display post cation", display);

      var randomNum = Math.floor((Math.random() * display.length));
      //console.log("randomNum", randomNum);

      display1 = display.splice(randomNum, 1);
      //console.log("display1", display1);

      this.display1 = this.game.add.sprite(this.game.world.centerX, this.game.world.height, display1);
      this.display1.anchor.setTo(2.7, 2.3);
      this.game.physics.arcade.enable(this.display1);
      this.game.physics.arcade.enable(this.display1);
      this.display1.inputEnabled = true;
      this.display1.input.enableDrag();
      this.spriteOrigPos = {x:0, y:0};

      var _this = this;
      console.log("cation", cation, "anion", anion);
      display1 = display1.pop();
      console.log("display1", display1);


      if (display1 === cation) {
        console.log("display1 in cation", display1);
        this.display1.events.onDragStop.add(function(currentSprite){
          console.log("display1 stopDrag cation");
          console.log("this.spriteOrigPos", this.spriteOrigPos);
          stopDrag(currentSprite, this.cationBox);
        }, this);
      } else if (display1 === anion) { 
        console.log("display1 in anion", display1);
        this.display1.events.onDragStop.add(function(currentSprite){
          console.log("display1 stopDrag anion");
          console.log("this.spriteOrigPos", this.spriteOrigPos);
          stopDrag(currentSprite, this.anionBox);
        }, this);
      } else {
        this.display1.events.onDragStart.add(function(sprite) {
          console.log("cation property", cation);
          console.log("this.spriteOrigPos", this.spriteOrigPos);
        }, this);

        this.display1.events.onDragStop.add(function(currentSprite){
        bounceBack(currentSprite, this.spriteOrigPos);
        }, this);
      }



      function bounceBack(currentSprite, oPos){
        console.log("this.spriteOrigPos from bounceBack", this.spriteOrigPos);
        if ( currentSprite.position.x !== oPos.x && currentSprite.position.y !== oPos.y ) {
          currentSprite.position.x = oPos.x;
          currentSprite.position.y = oPos.y;
        }
      }

      function stopDrag(currentSprite, endSprite){
        console.log("this.spriteOrigPos from stopDrag", this.spriteOrigPos);
        var inCorrectPosition = _this.game.physics.arcade.overlap(currentSprite, 
          endSprite, 
          function() {
            currentSprite.input.draggable = false; 
          } );
          if ( !inCorrectPosition ) {
            bounceBack(currentSprite, this.spriteOrigPos);
          }
        }



       

      // function stopDrag(currentSprite, endSprite){
      //   if (inCorrectPosition = _this.game.physics.arcade.overlap(currentSprite, endSprite) {
      //       currentSprite.input.draggable = false;
      //   } else (currentSprite.position.x !== endSprite.x && currentSprite.position.y !== endSprite.y ){
      //      bounceBack(currentSprite, endSprite);
      //   }
      // }
    } //closes create function

        //if ( !inCorrectPosition ) {
          //currentSprite.position.copyFrom(currentSprite.originalPosition);

      //}

      //  this.anion.events.onDragStop.add(function(currentSprite){
      //   stopDrag(currentSprite, this.anionBox);
      // }, this);

      //  this.cation.events.onDragStop.add(function(currentSprite){
      //   stopDrag(currentSprite, this.cationBox);
      // }, this);
       
   //}

    // function update() {
    //   if (this.cation.input.draggable === false && this.anion.input.draggable === false) {
    //     if(formulaArray.length > 1) {
    //       goodJob = game.add.text(330, 250, "Good Job");
    //       button = game.add.button(200, 200, 'button', nextProblem, this);
    //       button.scale.setTo(0.5);
    //       function nextProblem () {
    //         formulaArray.shift();
    //         console.log("shorter formulaArray", formulaArray.length);
    //         game.state.start('level1');
    //       }
    //     } else {
    //         finished = game.add.text(200, 230, "Finished Level 1");
    //     }
    //   }
    // }
  } //closes line 17
  ]);//closes line 16 
}); //closes line 6




























       