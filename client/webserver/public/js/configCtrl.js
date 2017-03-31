
app.controller("configCtrl", function($scope, $rootScope, $http) {
    
    $scope.getApiURL = function(){
        $http.get('/config/apiConfig.json').then(function(result){
            $rootScope.apiURL = result.data.apiURL;
        });
    }
    
    $scope.getProvIdMapping = function(){
        $http.get('/config/provinceIdMapping.json').then(function(result){
            $rootScope.provIdMapping = result.data.data;
        });
    }
    
    $scope.getApiURL();
    $scope.getProvIdMapping();
    
    
});
