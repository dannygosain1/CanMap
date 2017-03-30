
app.controller("renderCtrl", function($scope, $rootScope, $http) {

    $scope.renderMap = function() {
        return $http.get($rootScope.apiURL+"/canada/"+$scope.datasetName+"/sum")
            .then(function(response) {
                var data = response.data;
                $http.get('/maps/canada.geo.json')
                    .then(function(result) {
                        $("#spinner").hide();
                        $('#container').show();
                        Highcharts.mapChart('container', {
                            title: {
                                text: $scope.selectedDataset
                            },
                            mapNavigation: {
                                enabled: true,
                                buttonOptions: {
                                    verticalAlign: 'top'
                                }
                            },
                            colorAxis: {
                                tickPixelInterval: 100,
                                minColor:'#ffd1d1',
                                maxColor:'#8c0202',
                            },
                            series: [{
                                name: $scope.selectedDataset,
                                data: data,
                                mapData: result.data,
                                borderColor: "#fff",
                                borderWidth: 1,
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
    $http.get($rootScope.apiURL+"/datasets")
    .then(function(response){
        $scope.datasets = response.data;
        $scope.selectedDataset = $scope.datasets[0];
        $scope.datasetName = $scope.datasets[0].replace(/ /g,"_");
    }).then($scope.renderMap);
    $scope.update = function() {
        $scope.datasetName = $scope.selectedDataset.replace(/ /g,"_");
        $scope.renderMap();
    };
});
