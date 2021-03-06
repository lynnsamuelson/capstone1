define([
  "angular",
  "firebase",
  "q",
  "angularfire",
  //"$firebaseArray",
], function(angular, firebase, q, angularfire, $firebaseArray) {
  angular
  .module("balanceItApp.getCompounds", [])
  .factory("getCompounds", ["$firebaseArray", "$q", "$http",
   function($firebaseArray, $q, $http) {

    var formulaArray = [];

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
      
      getArray: function(data) {
        // compoundsFromFactory.then (function(data) {
          angular.forEach (data, function (value) {
            //console.log("value", value);
            formulaArray.push(value);
            //console.log("formulaArray in factory", formulaArray);
            return formulaArray;
          });
        }
     // }

  };
  }]);
});







// define([
//   "angular",
//   "firebase",
//   "q",
//   "angularfire",
//   //"$firebaseArray",
// ], function(angular, firebase, q, angularfire, $firebaseArray) {
//   angular
//   .module("balanceItApp.getCompounds", [])
//   .factory("getCompounds", ["$firebaseArray", "$q", "$http",
//    function($firebaseArray, $q, $http) {

//     var formulaArray = [];

//     $q(function(resolve, reject) {
      
//       $http.get("https://balanceit.firebaseio.com/Compounds/.json")
//       .success(
//         function(data) {
//           resolve(data);
//         }, function (error) {
//           reject(error);
//         });
//       })
//       .then function (data) {
//         angular.forEach (data, function (value) {
//           console.log("value", value);
//           formulaArray.push(value);
//           return formulaArray;
//         });
//       }

//   }]);
// });



      