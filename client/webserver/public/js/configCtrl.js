
<<<<<<< HEAD
<<<<<<< HEAD
apiURL = "";

app.controller("configCtrl", function($scope, $http) {
    $scope.getApiURL = function(){
        $http.get('/config/apiConfig.json').then(function(result){
            apiURL = result.apiURL;
        });
    }
});
=======
app.controller("configCtrl", function($scope, $http) {
    
}
>>>>>>> Adding Controllers
=======
apiURL = "";

app.controller("configCtrl", function($scope, $http) {
    $scope.getApiURL = function(){
        $http.get('/config/apiConfig.json').then(function(result){
            apiURL = result.apiURL;
        });
    }
});
>>>>>>> fixing controller issue, updating api url
