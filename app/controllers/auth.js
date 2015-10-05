define([
  "angular",
  "firebase",
  "angularRoute"
], function(angular, firebase, route) {
  angular
  .module("balanceItApp.auth", ["ngRoute"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
      templateUrl: "partials/auth.html",
      controller: "authCtrl",
      controllerAs: "auth"
    });
  }])
  .controller("authCtrl", ["$firebaseAuth", "$firebaseArray", "uid",
    function($firebaseAuth, $firebaseArray, uid) {
      var authRef = new Firebase("https://balanceit.firebaseio.com/");
      var userRef = new Firebase("https://balanceit.firebaseio.com/users/");
      var usersArr = $firebaseArray(userRef);
      var currentUID = "";
      var goTo = "";

      this.signUp = function() {
        authRef.createUser({
          email: this.email,
          password : this.password
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
            alert("User account created! You may now log in.");
          }
        }.bind(this));
      };

      this.logIn = function() {
        authRef.authWithPassword({
          email: this.email,
          password: this.password
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
            goTo = "username";
          } else {
                goTo = "home";
            }
            if(goTo !== "") {
              window.location = "#/" + goTo + "/";
            }
          })
        }.bind(this), {
          remember: "sessionOnly"
        };
      //};
      
      this.serviceAuth = function(service) {
        authRef.authWithOAuthPopup(service, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
            goTo = "username";
          } else {
                goTo = "home";
                console.log("goTo", goTo);
            }
            if(goTo !== "") {
              window.location = "#/" + goTo + "/";
            }
          })
        }.bind(this), {
          remember: "sessionOnly"
        };
      }

    //}
  ]);
});