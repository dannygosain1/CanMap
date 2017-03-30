var app = angular.module("canMap", []);
app.controller("getMap", function($scope, $http) {
    $http.get("http://006c9aca.ngrok.io/datasets")
    .then(function(response){
        $scope.datasets = response.data;
    });
});
