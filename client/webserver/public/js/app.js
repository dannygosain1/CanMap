var app = angular.module("dropdownList", []);
console.log("in app.js")
app.controller("myCtrl", function($scope) {
    $scope.products = ["Dataset1", "Dataset2", "Dataset3"];
});
