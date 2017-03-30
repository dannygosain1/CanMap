
app.controller("canMapCtrl", function($scope, $rootScope, $http) {
   
   // CONFIG FUNCTIONS
   $scope.getApiURL = function(){
       return $http.get('/config/apiConfig.json').then(function(result){
            $scope.apiURL = result.data.apiURL;
        });
    }
    
    $scope.getProvIdMapping = function(){
        return $http.get('/config/provinceIdMapping.json').then(function(result){
            $scope.provIdMapping = result.data.data;
        });
    }
    
    $scope.loadConfig = function(){
        return $scope.getApiURL().then($scope.getProvIdMapping);
    }
    
    //PARAMETER MANIPULATION FUNCTIONS
    //jquery
    $scope.paramsFromURL = function(){
        //console.log('paramsFromURL Called');
        $scope.url_params = {};
        var params = $(location).attr('search').replace('?','').split('&');
        params.forEach(function(param){
            var keyval = param.split('=');
            var key = keyval[0].toLowerCase();
            var val = keyval[1];
            
            if(key == 'p'){
                
                if(isNaN(val) || val < 0){
                    console.log('Invalid ProvID='+val);
                    return; // = continue for forEach
                }
                
                $scope.url_params.p = val;
                
            } else if(key == 'd'){
                if(isNaN(val) || val < 0 || val > $scope.datasets.length){
                    console.log('Invalid Dataset ID='+val);
                    return; // = continue for forEach
                }
                
                $scope.url_params.d = val.replace(" ","_");
                
            }
        });
        
        if(isInvalid($scope.url_params.d)){
            $scope.url_params.d = $scope.defaultSelectedDatasetId;
        }
        
        if(isInvalid($scope.url_params.p)){
            $scope.url_params.p = 1;
        }
        
        return;
    }
    
    //jquery
    $scope.updateURL = function(path){

        if(isInvalid(path)){

            var pathname = $(location).attr('pathname');
            path = pathname + '?' + $.param($scope.url_params);
        }
        
        history.pushState({},'UpdatedURL',path);
        return $scope.renderPage();
    }
     
    $scope.loadPage = function(){
        $scope.paramsFromURL()
        return $scope.renderPage();
        
    } 
    
    //GET DATASET LIST
    $scope.getDatasetList = function(){
        return $http.get($scope.apiURL+"/datasets").then(function(results){
            
            $scope.datasets = [];
            for(var d = 0; d < results.data.length; d++){
                $scope.datasets.push({
                    id:d,
                    name:results.data[d].split(" ").join("_"),
                    pretty_name:results.data[d]
                });
            }
            //Manipulate Dataset list if necessary here, for now start with pop 2016 = [1]
            $scope.defaultSelectedDatasetId = 1;
            $scope.selectedDataset = $scope.datasets[$scope.defaultSelectedDatasetId]; //OBJ!
            
        });
    }
    
    //RENDER FUNCTIONS
    $scope.renderPage = function(){
        //Logic based on parameters
        $scope.selectedDataset = $scope.datasets[$scope.url_params.d];
        return $http.get($scope.apiURL+"/canada/"+$scope.datasets[$scope.url_params.d].name+"/sum")
            .then(function(response) {
                var data = response.data;
                return $http.get('/maps/canada.geo.json')
                    .then(function(result) {
                        Highcharts.mapChart('container', {
                            title: {
                                text: $scope.datasets[$scope.url_params.d].pretty_name
                            },
                            mapNavigation: {
                                enabled: true,
                                buttonOptions: {
                                    verticalAlign: 'top'
                                }
                            },
                            colorAxis: {
                                tickPixelInterval: 100
                            },
                            series: [{
                                name: $scope.datasets[$scope.url_params.d].pretty_name,
                                data: data,
                                mapData: result.data,
                            }],
                            credits: {
                                enabled: false
                            },
                            chart: {
                                backgroundColor:'rgba(255, 255, 255, 0.1)'
                            },
                            exporting: {
                                enabled: false
                            }
                        });
                    })
            })

    }
    
    // DATA SELECT UPDATED
    $scope.datasetUpdate = function() {
        
        $scope.url_params.d = $scope.selectedDataset.id;
        $scope.selectedDatasetId = $scope.selectedDataset.id;
        return $scope.updateURL();
    };
    
    
    // EXECUTE ON LOAD
    $scope.datasets = [];
    $scope.url_params = {};
    $scope.loadConfig().then($scope.getDatasetList).then($scope.loadPage);
    
    
    // need to switch to angular directive
    window.addEventListener('popstate', function(event) {
        //console.log('window.addEventListener(popstate) Called');
        alert('test');
        return $scope.loadPage();
    });
    
   
});
