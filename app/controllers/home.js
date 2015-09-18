define([
  "angular",
  "angularRoute",
  "firebase",
  "bootstrap", 
], function(angular, angularRoute, firebase, bootstrap) {
  angular.module("balanceItApp.home", ["ngRoute"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/home", {
      templateUrl: "../partials/home.html",
      controller: "homeCtrl",
      controllerAs: "home"
    });
  }])

  .controller("homeCtrl", ["$firebaseArray", function($firebaseArray) {
    //console.log("got to home");


  }]);
}
);