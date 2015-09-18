//  define([
//   "angular",
// ], function(angular) {
//   angular
//   .module("balanceItApp.getFormulaArray", []) 
//     .factory ("getFormulaArray", ['gameFactory', 'getCompounds',
//      function(gameFactory, getCompounds) {

//       var game = gameFactory;
//       var formulaArray = [];

//       var compoundsFromFactory = getCompounds.goGetCompounds();

//       return {
//          getArray: function(compoundsFromFactory) {
//           console.log(compoundsFromFactory);
//           angular.forEach (compoundsFromFactory, function (value) {
//             console.log("value", value);
//             formulaArray.push(value);
//             console.log("formulaArray", formulaArray);
//             return formulaArray;
//           });
//         }
//       };
     


//       //console.log (compoundsFromFactory);
//       // compoundsFromFactory.then (function(data) {
//       //   angular.forEach (data, function (value) {
//       //     //console.log("value", value);
//       //     formulaArray.push(value);
//       //     console.log("formulaArray", formulaArray);
//       //     return formulaArray;
//       //   })
//       // });

//     }]);
// });