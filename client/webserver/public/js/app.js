var app = angular.module("canMap", []);

app.controller("getMap", function($scope, $http) {

    $scope.renderMap = function() {
        return $http.get("http://006c9aca.ngrok.io/canada/"+$scope.datasetName+"/sum")
            .then(function(response) {
                var data = response.data;
                $http.get('/maps/canada.geo.json')
                    .then(function(result) {
                        Highcharts.mapChart('container', {
                            title: {
                                text: 'Sample Title'
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
                                name: $scope.selectedDataset,
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
    $http.get("http://006c9aca.ngrok.io/datasets")
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
