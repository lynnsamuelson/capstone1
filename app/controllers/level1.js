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

  .controller("level1", ["$firebaseArray", "$scope", "$controller", "gameFactory", "preload", "getCompounds", "getFormulaArray",
    function($firebaseArray, $scope, $controller, gameFactory, preload, getCompounds, getFormulaArray) {
      //console.log("found Level 1");
      var game = gameFactory;
      var cation;
      var anion;
      var cationBox;
      var anionBox;
      var formula;
      var formulaArray = [];

      //console.log("game", game);

      game.state.add('level1', {preload:preload, create:create});
      
      // getFormulaArray.getArray();
      // console.log("game.formulaArray", game.formulaArray);

      // console.log (compoundsFromFactory);
     getCompounds.goGetCompounds()
        .then(function (data) {
          angular.forEach (data, function (value) {
            console.log("value", value);
            formulaArray.push(value);
          });
          console.log("formulaArray", formulaArray);
          game.state.start('level1');
        });



     function create() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      game.add.sprite(game.world.x, game.world.y, 'background');

      //static arrow box
      this.arrows = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'arrows');
      this.arrows.anchor.setTo(1.8, 5); 

      //static Water box
      this.water = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'water');
      this.water.anchor.setTo(2.3, 5);



      //Get data from factory (firebase)
      // game.formulaArray = [];
      //   compoundsFromFactory.then (function(data) {
      //     angular.forEach (data, function (value) {
      //       //console.log("value", value);
      //       game.formulaArray.push(value);
      //     });
        //console.log("array", game.formulaArray[0].anion);

        anion = formulaArray[0].anion;
        cation = formulaArray[0].cation;
        formula = formulaArray[0].formula;
        //console.log("anion", anion);
        
        console.log("anion", anion);

        //static box for the formula
        this.formula = this.game.add.sprite(this.game.world.centerX, this.game.world.height, formula);
        this.formula.anchor.setTo(2.5, 4);

        //static empty box anchored to anion
        this.anionBox = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'anionBox');
        this.anionBox.anchor.setTo(-1, 4);

        //movable anion box
        this.anion = this.game.add.sprite(this.game.world.centerX, this.game.world.height, anion);
        this.anion.anchor.setTo(-1, 2);
        this.game.physics.arcade.enable(this.anionBox);
        this.game.physics.arcade.enable(this.anion);
        this.anion.inputEnabled = true;
        this.anion.input.enableDrag();
        this.anion.originalPosition = this.anionBox.position.clone();

        // //static empty box anchored to cation
        this.cationBox = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'cationBox');
        this.cationBox.anchor.setTo(0.8, 4);

        // //movable anion box
        this.cation = this.game.add.sprite(this.game.world.centerX, this.game.world.height, cation);
        this.cation.anchor.setTo(0.8, 2);
        this.game.physics.arcade.enable(this.cationBox);
        this.game.physics.arcade.enable(this.cation);
        this.cation.inputEnabled = true;
        this.cation.input.enableDrag();
        this.cation.originalPosition = this.cationBox.position.clone();

        var _this = this;
        function stopDrag(currentSprite, endSprite){
          var tophat = _this.game.physics.arcade.overlap(currentSprite, 
                                                        endSprite, 
                                                        function() {
                                                          currentSprite.input.draggable = false; 
                                                        } );
          if ( !tophat ) {
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
         console.log("cation",cation);
          if (this.cation.input.draggable === true) {
            console.log("good job");
          }

          function update() {
            
          }

      //}.bind(this)
      //);
         
       
     
      





    

     }
  }]); 
}); 




























       