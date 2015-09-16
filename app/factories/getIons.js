define([
  "angular",
  "$firebase",
], function(angular, firebase) {
  angular
  .module("AminoApp.getProtein", [])
  .factory("getProtein", function() {


  });

  var gameIons = [];
  var ions = new Firebase("https://balanceit.firebaseio.com/Ions");

  return {
    getIons: function () {
        ions.once("value", function(snapshot) {
            var gameIons = snapshot.val();
            console.log("ions", gameIons);
          });
      },

    setIon: function(setProtein) {
      arrayofIons = gameIons;
    }       
  };
});