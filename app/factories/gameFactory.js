define([
  "angular",
], function(angular) {
  angular
  .module("balanceItApp.gameFactory", [])
  .factory("gameFactory", function() {
    var game = new Phaser.Game(900, 300, Phaser.AUTO, "gameTarget");
    console.log("fired");
    return game;
  });
});