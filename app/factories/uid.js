define([
  "angular",
], function(angular) {
  angular
  .module("balanceItApp.uid", [])
  .factory("uid", function() {
    var uid = null;
    return {
      getUid: function() {
        return uid;
      },
      setUid: function(sentID) {
        uid = sentID;
      }
    };
  });
});