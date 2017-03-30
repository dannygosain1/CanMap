function load_map(geojson) {
  // Initiate the chart
    var data = [];

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
            mapData: geojson,
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

}

function getFileName(file) {
    $.getJSON(file, load_map);
}

$(document).ready(getFileName('/data/canada.geo.json'));


// $(document).ready(function() {
//     $.getJSON('/data/canada.geo.json', load_map);
// });
