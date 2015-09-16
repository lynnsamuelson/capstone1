define([
  "angular",
  "angularRoute",
  "firebase",
  "bootstrap", 
], function(angular, angularRoute, firebase, bootstrap) {
  angular.module("balanceItApp.getIons", ["ngRoute"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/get", {
      templateUrl: "../partials/get-ions.html",
      controller: "ions",
    });
  }])

   .controller("ions", ["$firebaseArray", function($firebaseArray) {
    //console.log("got to getIons");

     

    function getCompounds() {
      var compounds = new Firebase("https://balanceit.firebaseio.com/Compounds");
      compounds.once("value", function(snapshot) {
          var gameCompounds = snapshot.val();
          console.log("compounds",gameCompounds);
        });
    }

    //getIons();

    //getCompounds();
  }]);
});
 