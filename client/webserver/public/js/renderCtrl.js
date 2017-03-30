
app.controller("renderCtrl", function($scope, $http) {

    $scope.renderMap = function() {
<<<<<<< HEAD
        return $http.get("http://7ca07d79.ngrok.io/canada/"+$scope.datasetName+"/sum")
=======
        return $http.get("http://a249d577.ngrok.io/canada/"+$scope.datasetName+"/sum")
>>>>>>> Adding Controllers
            .then(function(response) {
                var data = response.data;
                $http.get('/maps/canada.geo.json')
                    .then(function(result) {
<<<<<<< HEAD
                        $("#spinner").hide();
                        $('#container').show();
                        Highcharts.mapChart('container', {
                            title: {
                                text: $scope.selectedDataset
=======
                        Highcharts.mapChart('container', {
                            title: {
                                text: 'Sample Title'
>>>>>>> Adding Controllers
                            },
                            mapNavigation: {
                                enabled: true,
                                buttonOptions: {
                                    verticalAlign: 'top'
                                }
                            },
                            colorAxis: {
<<<<<<< HEAD
                                tickPixelInterval: 100,
                                minColor:'#ffd1d1',
                                maxColor:'#8c0202',
=======
                                tickPixelInterval: 100
>>>>>>> Adding Controllers
                            },
                            series: [{
                                name: $scope.selectedDataset,
                                data: data,
                                mapData: result.data,
<<<<<<< HEAD
                                borderColor: "#fff",
                                borderWidth: 1,
=======
>>>>>>> Adding Controllers
                            }],
                            credits: {
                                enabled: false
                            },
                            chart: {
<<<<<<< HEAD
                                backgroundColor:'rgba(255, 255, 255, 0.1)',
=======
                                backgroundColor:'rgba(255, 255, 255, 0.1)'
>>>>>>> Adding Controllers
                            },
                            exporting: {
                                enabled: false
                            }
                        });
                    })
            })
    }
<<<<<<< HEAD
    $http.get("http://7ca07d79.ngrok.io/datasets")
    .then(function(response){
        $scope.datasets = response.data;
        $scope.selectedDataset = $scope.datasets[0];
        $("#spinner").show();
        $scope.datasetName = $scope.datasets[0].replace(/ /g,"_");
    }).then($scope.renderMap);
    $scope.update = function() {
        $('#container').hide();
        $("#spinner").show();
=======
    $http.get("http://a249d577.ngrok.io/datasets")
    .then(function(response){
        $scope.datasets = response.data;
        $scope.selectedDataset = $scope.datasets[0];
        $scope.datasetName = $scope.datasets[0].replace(/ /g,"_");
    }).then($scope.renderMap);
    $scope.update = function() {
>>>>>>> Adding Controllers
        $scope.datasetName = $scope.selectedDataset.replace(/ /g,"_");
        $scope.renderMap();
    };
});
