var app = angular.module("canMap", []);

app.controller("getMap", function($scope, $http) {
    $http.get("http://006c9aca.ngrok.io/datasets")
    .then(function(response){
        $scope.datasets = response.data;
    });
});

app.controller("renderMap", function($scope, $http){
    $http.get('/maps/nu_test.geo.min.json')
    .then(function(response){
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
            series: [{
                name: 'Sample Data',
                mapData: response.data,
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
    });
});
