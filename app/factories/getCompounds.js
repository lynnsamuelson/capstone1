
define([
  "angular",
  "firebase",
  "q",
  "angularfire",
  //"$firebaseArray",
], function(angular, firebase, q, angularfire, $firebaseArray) {
  angular
  .module("balanceItApp.getCompounds", [])
  .factory("getCompounds", ["$firebaseArray", "$q", "$http", function($firebaseArray, $q, $http) {


    return {
      goGetCompounds: function () {
        return $q(function(resolve, reject) {
          $http.get("https://balanceit.firebaseio.com/Compounds/.json")
          .success(
            function(data) {
              resolve(data);
            }, function (error) {
              reject(error);
            });
        });
      },

      setEquation: function(setEquation) {
        formula = gameCompound;
      }       
    };
  }]);
});



      