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

     function getIons() {
      var ions = new Firebase("https://balanceit.firebaseio.com/Ions");
      ions.once("value", function(snapshot) {
          var gameIons = snapshot.val();
          //console.log("ions", gameIons);
        });
    }

    function getCompounds() {
      var compounds = new Firebase("https://balanceit.firebaseio.com/Compounds");
      var thing = $firebaseArray(compounds);
      console.log(thing);
    }



    var getEquation = function () {
      var compounds = new Firebase("https://balanceit.firebaseio.com/Compounds");
      var data = $firebaseArray(compounds);
      var formula = [];
      angular.forEach (data, function (value, key) {
        this.push(key + ":" + value);
      }, formula);
      return formula;
    };

    console.log(getEquation());

    getIons();

    getCompounds();
  }]);
});
 