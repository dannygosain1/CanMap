var app = angular.module("canMap", []);
app.controller("myCtrl", function($scope) {
    $scope.datasets = ["Dataset1", "Dataset2", "Dataset3"];
});

// <script>
// var app = angular.module('myApp', []);
// app.controller('myCtrl', function($scope) {
//     $scope.names = ["Emil", "Tobias", "Linus"];
// });
// </script>
//
// <p>This example shows how to fill a dropdown list using the ng-options directive.</p>
