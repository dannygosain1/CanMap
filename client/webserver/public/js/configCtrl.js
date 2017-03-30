apiURL = "";

app.controller("configCtrl", function($scope, $http) {
    $scope.getApiURL = function(){
        $http.get('/config/apiConfig.json').then(function(result){
            apiURL = result.apiURL;
        });
    }
});

