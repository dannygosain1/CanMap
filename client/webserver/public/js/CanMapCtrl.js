app.controller("canMapCtrl", function($scope, $rootScope, $http) {

   $scope.shareableLink = function(){
       $('#shareLink').show();
   }
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
        $scope.url_params = {};
        var params = $(location).attr('search').replace('?','').split('&');
        params.forEach(function(param){
            var keyval = param.split('=');
            var key = keyval[0].toLowerCase();
            var val = keyval[1];

            if(key == 'p'){

                if(isNaN(val) || val < 0){
                    return; // = continue for forEach
                }

                $scope.url_params.p = val;

            } else if(key == 'd'){
                if(isNaN(val) || val < 0 || val > $scope.datasets.length){
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

        $scope.isProvince = !($scope.url_params.p == 1);

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
                    name:results.data[d].replaceAll(" ", "_"),
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
        $scope.shareUrl = $(location).attr('href');
        $scope.selectedDataset = $scope.datasets[$scope.url_params.d];
        var detail = '';

        var dataUrl =  $scope.apiURL+"/province/" +
                        $scope.url_params.p+'/'+$scope.datasets[$scope.url_params.d].name+detail;
        return $http.get(dataUrl).then(response => {
                var data = response.data;
                var mapUrl = '/maps/'+$scope.provIdMapping[$scope.url_params.p].abbr.toLowerCase() +
                                '.geo.min.json';
                $http.get(mapUrl).then(result => {
                        $("#spinner").hide();
                        $('#container').show();
                        var title = $scope.provIdMapping[$scope.url_params.p].name + ' - ' + $scope.datasets[$scope.url_params.d].pretty_name.capitalize()
                        Highcharts.mapChart('container', {
                            title: {
                                text: title,
                                align: 'center'
                            },
                            mapNavigation: {
                                enabled: true,
                                buttonOptions: {
                                    align: 'right',
                                    verticalAlign: 'middle'
                                }
                            },
                            plotOptions: {
                                series: {
                                    point: {
                                        events: {
                                            click: function() {
                                                $scope.url_params.p = this['hc-key'];
                                                $('#container').hide();
                                                $("#spinner").show();
                                                $scope.updateURL()
                                            }
                                        }
                                    }

                                },

                            },
                            colorAxis: {
                                tickPixelInterval: 100,
                                minColor:'#ffd1d1',
                                maxColor:'#8c0202',
                            },
                            series: [{
                                name: $scope.selectedDataset.pretty_name,
                                data: data,
                                mapData: result.data,
                                borderColor: "#fff",
                                borderWidth: 1,
                                margin:0,
                                nullColor:'#b2aeae',
                                dataLabels: {
                                    enabled: true,
                                    color: '#FFFFFF',
                                    formatter: function() {
                                        if(this.point.properties && this.point.properties['hc-key'] && !$scope.isProvince) {
                                            var key = this.point.properties['hc-key'];
                                            if($scope.provIdMapping[key])
                                                return $scope.provIdMapping[key].abbr;
                                        } else if(this.point.properties && this.point.properties['CDNAME']) {
                                            return key.unCamelCase(" ");
                                        }
                                    }
                                },
                                states: {
                                    hover: {
                                        color: '#edc84e'
                                    }
                                },
                                tooltip: {
                                    pointFormatter: function() {
                                        key = this.name || this.properties['CDNAME'] ||  this['hc-key'];
                                        //un camel case CDNAME
                                        key = (key == this.properties['CDNAME']) ? key.unCamelCase(" ") : key;
                                        return key + ": <b>" + this.value.toLocaleString() + "</b>"
                                    }
                                }
                            }],
                            legend: {
                                reversed: true
                            },
                            credits: {
                                enabled: false
                            },
                            chart: {
                                backgroundColor:'rgba(255, 255, 255, 0.1)',
                                spacing: [20, 0, 0, 0],
                                height: 600,
                            },
                            exporting: {
                                enabled: false
                            }
                        });
                    });
            })

    }

    // DATA SELECT UPDATED
    $scope.datasetUpdate = function() {

        $scope.url_params.d = $scope.selectedDataset.id;
        $scope.selectedDatasetId = $scope.selectedDataset.id;
        $('#container').hide();
        $("#spinner").show();
        return $scope.updateURL();
    };


    // EXECUTE ON LOAD
    $scope.datasets = [];
    $scope.url_params = {};
    $scope.loadConfig().then($scope.getDatasetList).then($scope.loadPage);


    // need to switch to angular directive
    window.addEventListener('popstate', function(event) {
        return $scope.loadPage();
    });


});
