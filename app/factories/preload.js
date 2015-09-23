define([
  "angular",
], function(angular) {
  angular
  .module("balanceItApp.preload", []) 
    .factory ("preload", ['gameFactory', 'getCompounds', function(gameFactory, getCompounds) {


      var game = gameFactory;
      //var compoundsFromFactory = getCompounds.goGetCompounds();

      return function () {
        this.scale.pageAlignHorizontally = true;
        game.load.image("background", "images/testTubes.jpg");
        game.load.image("button", "images/button.jpg", 50, 50);
        game.load.image("grayBox", "images/grayBox.jpg", 50, 50);
        game.load.image("grayBox2", "images/grayBox.jpg", 50, 50);
        game.load.spritesheet("Br", "images/Br.png", 150, 59);
        game.load.image("2Cl", "images/2Cl.jpg  ", 150, 61);
        game.load.image("2Br", "images/2Br.jpg  ", 150, 61);
        game.load.image("Cl", "images/Cl.png  ", 150, 61);
        game.load.image("Li", "images/Li.jpg  ", 150, 61);
        game.load.image("LiBr", "images/LiBr.png  ", 149, 60);
        game.load.image("LiCl", "images/LiCl.png  ", 149, 60);
        game.load.image("Mg", "images/Mg.jpg  ", 150, 59);
        game.load.image("MgBr2", "images/MgBr2.png  ", 149, 60);
        game.load.image("MgCl2", "images/MgCl2.jpg  ", 149, 60);
        game.load.image("MgSO4", "images/MgSO4.jpg  ", 149, 60);
        game.load.spritesheet("Na", "images/Na.jpg", 150, 61);
        game.load.spritesheet("Na2SO4", "images/Na2SO4.png", 149, 60);
        game.load.spritesheet("NaBr", "images/NaBr.jpg", 149, 60);
        game.load.spritesheet("NaCl", "images/NaCl.jpg", 149, 60);
        game.load.spritesheet("SO4", "images/SO4.jpg", 150, 59);
        game.load.spritesheet("arrows", "images/arrows.jpg", 112, 59);
        game.load.spritesheet("beaker", "images/beaker.jpg", 149, 60);
        game.load.spritesheet("anionBox", "images/anion.jpg", 160, 59);
        game.load.spritesheet("cationBox", "images/cation.jpg", 160, 59);
        game.load.spritesheet("water", "images/water.jpg", 112, 59);

      };
    }]);
});