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

      //movable anion box
      this.anion = this.game.add.sprite(this.game.world.centerX, this.game.world.height, anion);
      this.anion.anchor.setTo(-0.7, 2.3);
      this.game.physics.arcade.enable(this.anionBox);
      this.game.physics.arcade.enable(this.anion);
      this.anion.inputEnabled = true;
      this.anion.input.enableDrag();
      this.anion.originalPosition = this.anionBox.position.clone();

      // //static empty box anchored to cation
      this.cationBox = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'cationBox');
      this.cationBox.anchor.setTo(0.5, 4);

      // //movable anion box
      this.cation = this.game.add.sprite(this.game.world.centerX, this.game.world.height, cation);
      this.cation.anchor.setTo(0.4, 2.3);
      this.game.physics.arcade.enable(this.cationBox);
      this.game.physics.arcade.enable(this.cation);
      this.cation.inputEnabled = true;
      this.cation.input.enableDrag();
      this.cation.originalPosition = this.cationBox.position.clone();

      
      for (var i = 0; i < 3; i++) {
        variables = formulaArray.splice(Math.floor(Math.random()*formulaArray.length),1);
        if (variables[0].anion !== display[i]) {
          display.push(variables[0].anion);
          display.push(variables[0].cation);
        }
      }
      console.log("display", display);



      //add other sprites to the page
      this.Cl = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'Cl');
      this.Cl.anchor.setTo(1.5, 2.3);
      this.game.physics.arcade.enable(this.Cl);
      this.game.physics.arcade.enable(this.Cl);
      this.Cl.inputEnabled = true;
      this.Cl.input.enableDrag();
      this.spriteOrigPos = {x:0, y:0};

      this.Br = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'Br');
      this.Br.anchor.setTo(2.7, 2.3);
      this.game.physics.arcade.enable(this.Br);
      this.game.physics.arcade.enable(this.Br);
      this.Br.inputEnabled = true;
      this.Br.input.enableDrag();
      this.spriteOrigPos = {x:0, y:0};



      
      var _this = this;
      function bounceBack(currentSprite, oPos){
        if ( currentSprite.position.x !== oPos.x && currentSprite.position.y !== oPos.y ) {
          currentSprite.position.x = oPos.x;
          currentSprite.position.y = oPos.y;
        }
      }

      this.Cl.events.onDragStart.add(function(sprite) {
        console.log("Firing drag start now");
        this.spriteOrigPos.x = sprite.position.x;
        this.spriteOrigPos.y = sprite.position.y;
        console.log(this.spriteOrigPos.x, this.spriteOrigPos.y);
      }, this);

      this.Cl.events.onDragStop.add(function(currentSprite){
        console.log(this.spriteOrigPos.x, this.spriteOrigPos.y);
        bounceBack(currentSprite, this.spriteOrigPos);
      }, this);

      this.Br.events.onDragStart.add(function(sprite) {
        console.log("Firing drag start now");
        this.spriteOrigPos.x = sprite.position.x;
        this.spriteOrigPos.y = sprite.position.y;
        console.log(this.spriteOrigPos.x, this.spriteOrigPos.y);
      }, this);

      this.Br.events.onDragStop.add(function(currentSprite){
        console.log(this.spriteOrigPos.x, this.spriteOrigPos.y);
        bounceBack(currentSprite, this.spriteOrigPos);
      }, this);



      function stopDrag(currentSprite, endSprite){
        var inCorrectPosition = _this.game.physics.arcade.overlap(currentSprite, 
          endSprite, 
          function() {
            currentSprite.input.draggable = false; 
          } );

        if ( !inCorrectPosition ) {
          currentSprite.position.copyFrom(currentSprite.originalPosition);
        }
      }

       this.anion.events.onDragStop.add(function(currentSprite){
        stopDrag(currentSprite, this.anionBox);
      }, this);

       this.cation.events.onDragStop.add(function(currentSprite){
        stopDrag(currentSprite, this.cationBox);
      }, this);
        //console.log(this.cationBox.position)
       
   }

    function update() {
      if (this.cation.input.draggable === false && this.anion.input.draggable === false) {
        if(formulaArray.length > 1) {
          goodJob = game.add.text(330, 250, "Good Job");
          button = game.add.button(200, 200, 'button', nextProblem, this);
          button.scale.setTo(0.5);
          function nextProblem () {
            formulaArray.shift();
            console.log("shorter formulaArray", formulaArray.length);
            game.state.start('level1');
          }
        } else {
            finished = game.add.text(200, 230, "Finished Level 1");
        }
      }
    }
  }]); 
}); 




























       