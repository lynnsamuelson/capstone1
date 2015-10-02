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
        game.load.image("background", "images/bench3.png", 900, 300);
        game.load.spritesheet("Br", "images/Br.png", 75, 75);
        game.load.spritesheet("Ca", "images/Ca.png", 75, 75);
        game.load.spritesheet("CaBr2", "images/CaBr2.png", 150, 150);
        game.load.spritesheet("CaCl2", "images/CaCl2.png", 150, 150);
        game.load.spritesheet("CaF2", "images/CaF2.png", 150, 150);
        game.load.spritesheet("cationBox", "images/cation2.png", 150, 150);
        game.load.image("Cl", "images/Cl.png", 75, 75);
        game.load.image("Cu", "images/Cu.png ", 75, 75);
        game.load.image("Cu2", "images/Cu2.png ", 75, 75);
        game.load.image("CuBr", "images/CuBr.png ", 150, 150);
        game.load.image("CuBr2", "images/CuBr2.png ", 150, 150);
        game.load.image("CuCl", "images/CuCl.png ", 150, 150);
        game.load.image("CuCl2", "images/CuCl2.png ", 150, 150);
        game.load.image("Fl", "images/F.png", 75, 75);
        game.load.image("I", "images/I.png", 75, 75);
        game.load.image("K", "images/K.png", 75, 75);
        game.load.image("K2MnO4", "images/K2MnO4.png", 150, 150);
        game.load.image("KI", "images/KI.png", 150, 150);
        game.load.image("KMnO4", "images/KMnO4.png", 150, 150);
        game.load.image("Li", "images/Li.png", 75, 75);
        game.load.image("LiBr", "images/LiBr.png", 150, 150);
        game.load.image("LiCl", "images/LiCl.png", 150, 150);
        game.load.image("Mg", "images/Mg.png", 75, 75);
        game.load.image("MgBr2", "images/MgBr2.png", 150, 150);
        game.load.image("MgCl2", "images/MgCl2.png", 150, 150);
        game.load.image("MgSO4", "images/MgSO4.png", 150, 150);
        game.load.image("MnO4", "images/MnO4-.png", 75, 75);
        game.load.image("MnO42", "images/MnO4.png", 75, 75);
        game.load.spritesheet("Na", "images/Na.png", 150, 150);
        game.load.spritesheet("NaBr", "images/NaBr.png", 150, 150);
        game.load.spritesheet("NaCl", "images/NaCl.png", 150, 150);
        game.load.spritesheet("Na2SO4", "images/Na2SO4.png", 150, 150);
        game.load.spritesheet("SO4", "images/SO4.png", 75, 75);
        game.load.spritesheet("arrows", "images/arrow.png", 200, 65);
        game.load.spritesheet("stirbar", "images/stirbar.png", 112, 59);
        game.load.spritesheet("anionBox", "images/anionTest.png", 150, 150);
        game.load.spritesheet("water", "images/water.png", 112, 59);
        game.load.spritesheet("blue", "images/blueLow.png", 200, 200);

        

      };
    }]);
});