define([
  "angular",
], function(angular) {
  angular
  .module("balanceItApp.gameFactory", [])
  .factory("gameFactory", function() {
    var game = new Phaser.Game(900, 350, Phaser.AUTO, "gameTarget");

    return game;
  });
});